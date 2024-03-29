const { validationResult } = require("express-validator/check")
const bcrypt = require("bcryptjs")
const {ObjectId} = require('mongodb')
var nodemailer =  require('nodemailer')

const User = require('../models/user')
const Activities = require('../models/activities')
const Token = require('../models/token')

const jwtHelper = require("../helpers/jwt.helper")
const accessTokenLife = process.env.TOKEN_LIFE || '365d'
const accessTokenSecret = process.env.ACCESS_TOKEN || "s0me-secr3t-goes-here"
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d"
const refreshTokenSecret = process.env.REFRESH_TOKEN || "some-s3cret-refre2h-token"
const passwordTokenSecret = process.env.PASSWORD_TOKEN || "some-s3cret-pa$$word-token"
const passwordTokenLife = process.env.PASSWORD_TOKEN_LIFE || "600000"
const URL_FRONTEND = process.env.URL_FRONTEND || "http://localhost:3000/"

exports.signup = async (req, res, next) => {
    try{

        const email = req.body.email
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const password = req.body.password
        const gender = req.body.gender
        const image = null
        if(!email){
            res.status(203).json({ message: 'Not found Email' })
            return
        }
        if(!password){
            res.status(203).json({ message: 'Not found password' })
            return
        }
        if(!firstname){
            res.status(203).json({ message: 'Not found name' })
            return
        }
        if (req.file !== undefined) {
            image = req.file.path
        }

        const hashedPw = await bcrypt.hash(password, 12)

        const user = new User({
            email: email,
            password: hashedPw,
            firstname: firstname,
            lastname: lastname,
            name: firstname + ' ' + lastname,
            gender: gender,
            image: image
        })

        const newuser = await user.save()
        res.status(201).json({  userId: newuser._id })
    }
    catch (error) {
        
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try{
        
        const email = req.body.email
        const password = req.body.password

        if(!email){
            res.status(203).json({ message: 'Not found Email' })
            return
        }
        if(!password){
            res.status(203).json({ message: 'Not found password' })
            return
        }

        let loadedUser = await User.findOne({ email: email })
        if (!loadedUser) {
            res.status(203).json({
                message: 'Not found user',
            });
            return
        }
        const isEqual = await bcrypt.compare(password, loadedUser.password)
        if (!isEqual) {
            res.status(203).json({
                message: 'Wrong password!',
            });
            return
        }
        
        const userFakeData = {
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
        }

        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
        const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
        
        const tokendata = new Token({
            refreshtoken: refreshToken
        })

        await tokendata.save()

        const action = new Activities({
            action: 'Login',
            iduser: loadedUser._id
        })

        await action.save()

        res.status(200).json({ token: accessToken, refreshToken: refreshToken, userId: loadedUser._id.toString() })
        // return;
    }
    catch (error) {
        
        next(error)
    }
}
exports.refreshToken = async (req, res, next) => {
    try {
        const refreshTokenFromClient = req.body.refreshToken;
        const checktoken = await Token.findOne({refreshtoken: refreshTokenFromClient})

        if (checktoken) {
        
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            
            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            return res.status(200).json({accessToken});
        } 
        else {
            return res.status(203).json({
                message: 'No token provided.',
            });
        }
    }
    catch (error) {
        res.status(401).json({
            message: 'Invalid refresh token.',
        });
    }
};
exports.logout = async (req, res, next) => {
    const refreshTokenFromClient = req.body.refreshToken;
    
    const checktoken = await Token.findOne({refreshtoken: refreshTokenFromClient})
    await Token.findByIdAndRemove(ObjectId(checktoken._id))
    if (checktoken) {
      try {
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
        
        const userFakeData = decoded.data;
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

        const action = new Activities({
            action: 'Logout',
            iduser: loadedUser._id
        })

        await action.save()

        return res.status(200).json({accessToken});
      } catch (error) {
        res.status(203).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      return res.status(401).send({
        message: 'No token provided.',
      });
    }
};
  
exports.findUser = async (req, res, next) => {
    try{
        
        const email = req.body.email

        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(203).json({
                message: 'Not Found user',
            });
            return
        }

        res.status(200).json({ user: user })
    }
    catch (error) {
        
        next(error)
    }
}
exports.editPermission = async (req, res, next) => {
    try{
        const iduser = req.params.iduser
        const position = req.body.position
        const newUser = {
            position,
        } 
        const user = await User.findByIdAndUpdate(iduser, newUser, { new: true })
        console.log(user)
        const action = new Activities({
            action: 'editPermission',
            content: 'auth/editPermission/' + iduser,
            olddata:user,
            newdata: newUser
        })

        await action.save()

        res.status(201).json({ user})
    }
    catch(err) {
        
        next(err)
    }
}

exports.editProfile = async (req, res, next) => {
    try{
        
        const iduser = req.params.iduser
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }

        const dataUpdate = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            name: req.body.firstname + ' ' + req.body.lastname,
            image: image,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            dateedit: Date.now()
        }

        const user = await User.findByIdAndUpdate(iduser, dataUpdate,{ new: true })

        const action = new Activities({
            action: 'editProfile',
            content: 'auth/editProfile/' + iduser,
            iduser: req.userId,
            olddata: {
                name: user.name,
                image: user.image,
                birthdate: user.birthdate,
                gender: user.gender,
            },
            newdata: dataUpdate
        })

        await action.save()

        res.status(200).json({result: user})
    }
    catch (error) {
        res.status(500).json({
            message: 'Validation failed',
        });
        next(error)
    }
}
exports.findUserLikeEmail = async (req, res, next) => {
    try{
        
        const email = req.body.email
        const listuser = await User.find({ email: { $regex: email } })
        if (!listuser) {
            res.status(203).json({message: 'Not found user'})
            return
        }
        res.status(200).json({result: listuser})
    }
    catch (error) {
        
        next(error)
    }
}
exports.FindUserID = async (req, res, next) => {
    try{
        const iduser = req.params.iduser

        const user = await User.findById(iduser)

        res.status(200).json({result: user})
    }
    catch (error) {
        
        next(error)
    }
}
exports.getMyInfo = async (req, res, next) => {
    try{
        const iduser = req.userId
        const user = await User.findById(iduser).select('email _id name image avatar')

        res.status(200).json({result: user})
    }
    catch (error) {
        
        next(error)
    }
}
exports.getListUser = async (req, res, next) => {
    try{
        const user = await User.find({})

        res.status(200).json({result: user})
    }
    catch (error) {
        
        next(error)
    }
}
exports.loginbyfacebook = async (req, res, next) => {
    try{
        const idfacebook = req.body.idfacebook
        const image = req.body.image
        const name = req.body.name
        const email = req.body.email

        let user = await User.findOne({idfacebook: idfacebook})
        if(!user){
            user = new User({
                idfacebook: idfacebook,
                name: name,
                avatar: image,
                email: email
            })
            const newuser = await user.save()
            const userFakeData = {
                email: newuser.email,
                userId: newuser._id.toString(),
            }
    
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            
            const tokendata = new Token({
                refreshtoken: refreshToken
            })

            await tokendata.save()

            const action = new Activities({
                action: 'loginbyfacebook',
                iduser: newuser._id
            })
    
            await action.save()

            res.status(200).json({token: accessToken, refreshToken: refreshtoken, userId: newuser._id.toString()})
        }
        else{
            const userFakeData = {
                email: email,
                userId: user._id.toString()
            }
    
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            
            const tokendata = new Token({
                refreshtoken: refreshToken
            })
    
            await tokendata.save()

            const action = new Activities({
                action: 'loginbyfacebook',
                iduser: user._id
            })
    
            await action.save()
    
            res.status(200).json({token: accessToken, refreshToken: refreshtoken, userId: user._id.toString()})
        }

        
    }
    catch (error) {
        
        next(error)
    }
}
exports.loginbygoogle = async (req, res, next) => {
    try{
        const idgoogle = req.body.idgoogle
        const image = req.body.image
        const email = req.body.email
        const name = req.body.name
        let user = await User.findOne({idgoogle: idgoogle})
        if(!user){
            user = new User({
                idgoogle: idgoogle,
                name: name,
                avatar: image,
                email: email
            })
            const newuser = await user.save()
            const userFakeData = {
                email: newuser.email,
                userId: newuser._id.toString(),
            }
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            const tokendata = new Token({
                refreshtoken: refreshToken
            })
            await tokendata.save()
    
            const action = new Activities({
                action: 'loginbygoogle',
                iduser: newuser._id
            })
    
            await action.save()
            res.status(200).json({token: accessToken, refreshToken: refreshtoken, userId: newuser._id.toString()})
        }
        else{
            const userFakeData = {
                email: email,
                userId: user._id.toString()
            }
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            
            const tokendata = new Token({
                refreshtoken: refreshToken
            })
            await tokendata.save()

            const action = new Activities({
                action: 'loginbygoogle',
                iduser: user._id
            })
    
            await action.save()
            res.status(200).json({token: accessToken, refreshToken: refreshToken, userId: user._id.toString()})
        }

        
    }
    catch (error) {
        
        next(error)
    }
}
exports.sendMail = async (req, res, next) => {
    try{
        const email = req.body.email
        let user = await User.findOne({email: email})
        const userFakeData = {
            email: email,
            userId: user._id.toString()
        }
        const refreshToken = await jwtHelper.generateToken(userFakeData, passwordTokenSecret, passwordTokenLife)

        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL ,
                pass: process.env.PASSWORD
            },
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'JIRALLO' + process.env.EMAIL,
            to: email,
            subject: 'JIRALLO',
            text: URL_FRONTEND + 'forgotpassword/' + refreshToken,
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
            } else {
            }
        });
        res.status(200).json({ statusCode: "ok" });
    }
    catch (error) {
        
        next(error)
    }
}
exports.changePass = async (req, res, next) => {
    try{
        const password = req.body.password
        const token = req.body.token

        const decoded = await jwtHelper.verifyToken(token, passwordTokenSecret)

        let user = await User.findById( decoded.data.userId)
        
        const hashedPw = await bcrypt.hash(password, 12)
        const data = {
            password: hashedPw
        }
        await User.findByIdAndUpdate(user._id, data)
        res.status(200).json({ statusCode: "ok", message:"Đã đổi mật khẩu" });
        

        
    }
    catch (error) {
        
        next(error)
    }
}