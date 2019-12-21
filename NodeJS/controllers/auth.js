const { validationResult } = require("express-validator/check")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {ObjectId} = require('mongodb')

const User = require('../models/user')
const Activities = require('../models/activities')
const Token = require('../models/token')

const jwtHelper = require("../helpers/jwt.helper")
const accessTokenLife = process.env.TOKEN_LIFE || '365d'
const accessTokenSecret = process.env.ACCESS_TOKEN || "s0me-secr3t-goes-here"
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d"
const refreshTokenSecret = process.env.REFRESH_TOKEN || "some-s3cret-refre2h-token"

exports.signup = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404
            error.data = errors.array()
            res.status(404).json(error)
            throw error
        }

        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const gender = req.body.gender
        const image = null

        if (req.file !== undefined) {
            image = req.file.path
        }

        const hashedPw = await bcrypt.hash(password, 12)

        const user = new User({
            email: email,
            password: hashedPw,
            name: name,
            gender: gender,
            image: image
        })

        const newuser = await user.save()
        res.status(201).json({ statusCode: 200, userId: newuser._id })
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try{
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({
                message: 'Validation failed..',
            });
            throw error
        }
        const email = req.body.email
        const password = req.body.password

        let loadedUser = await User.findOne({ email: email })
        if (!loadedUser) {
            res.status(401).json({
                message: 'Not found user',
            });
            return next()
        }
        const isEqual = await bcrypt.compare(password, loadedUser.password)
        if (!isEqual) {
            res.status(401).json({
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
        // return next();
    }
    catch (error) {
        
        next(error)
    }
}
exports.refreshToken = async (req, res, next) => {
    try {
        const refreshTokenFromClient = req.body.refreshToken;
        console.log(refreshTokenFromClient)
        const checktoken = await Token.findOne({refreshtoken: refreshTokenFromClient})
        console.log(checktoken)
        if (checktoken) {
        
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            
            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            return res.status(200).json({accessToken});
        } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
        }
    }
    catch (error) {
        res.status(403).json({
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
        res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
};
  
exports.findUser = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({
                message: 'Validation failed',
            });
            throw error
        }

        const email = req.body.email

        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({
                message: 'Not Found user',
            });
            throw error
        }

        res.status(200).json({ user: user })
    }
    catch (error) {
        
        next(error)
    }
}
exports.editProfile = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({
                message: 'Error',
            });
            throw error
        }

        const iduser = req.params.iduser
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }

        const dataUpdate = {
            name: req.body.name,
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

        res.status(200).json({statusCode: 200,result: user})
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
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(404).json({
                message: 'Validation failed',
            });
            throw error
        }
        const email = req.body.email
        const listuser = await User.find({ email: { $regex: email } })
        if (!listuser) {
            const error = new Error("Không tìm thầy user")
            error.statusCode = 404
            res.status(404).json(error)
            throw error
        }
        res.status(200).json({statusCode: 200,result: listuser})
    }
    catch (error) {
        
        next(error)
    }
}
exports.FindUserID = async (req, res, next) => {
    try{
        const iduser = req.params.iduser

        const user = await User.findById(iduser)

        res.status(200).json({statusCode: 200,result: user})
    }
    catch (error) {
        
        next(error)
    }
}
exports.getMyInfo = async (req, res, next) => {
    try{
        const iduser = req.userId
        const user = await User.findById(iduser).select('email _id name image avatar')

        res.status(200).json({statusCode: 200,result: user})
    }
    catch (error) {
        
        next(error)
    }
}
exports.getListUser = async (req, res, next) => {
    try{
        const user = await User.find({})

        res.status(200).json({statusCode: 200,result: user})
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
        console.log("1")
        let user = await User.findOne({idgoogle: idgoogle})
        if(!user){
            user = new User({
                idgoogle: idgoogle,
                name: name,
                avatar: image,
                email: email
            })
            console.log("2")
            const newuser = await user.save()
            console.log("3")
            const userFakeData = {
                email: newuser.email,
                userId: newuser._id.toString(),
            }
            console.log("4")
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            console.log("5")
            const tokendata = new Token({
                refreshtoken: refreshToken
            })
            console.log("6")
            await tokendata.save()
    
            console.log("7")
            const action = new Activities({
                action: 'loginbygoogle',
                iduser: newuser._id
            })
    
            await action.save()
            console.log("8")
            res.status(200).json({token: accessToken, refreshToken: refreshtoken, userId: newuser._id.toString()})
        }
        else{
            const userFakeData = {
                email: email,
                userId: user._id.toString()
            }
            console.log("9")
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            
            const tokendata = new Token({
                refreshtoken: refreshToken
            })
            console.log("10")
            await tokendata.save()

            const action = new Activities({
                action: 'loginbygoogle',
                iduser: user._id
            })
    
            await action.save()
            console.log("11")
            res.status(200).json({token: accessToken, refreshToken: refreshToken, userId: user._id.toString()})
        }

        
    }
    catch (error) {
        
        next(error)
    }
}