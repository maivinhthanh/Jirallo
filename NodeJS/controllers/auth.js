const { validationResult } = require("express-validator/check")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const User = require('../models/user')
const Activities = require('../models/activities')

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
            const error = new Error("Validation failed.")
            error.statusCode = 404
            error.data = errors.array()
            res.status(404).json(error)
            throw error
        }

        const email = req.body.email
        const password = req.body.password

        let loadedUser = await User.findOne({ email: email })
        if (!loadedUser) {
            const error = new Error("Không tìm thấy user.")
            error.statusCode = 404
            res.status(500).json(error)
            throw error
        }

        const isEqual = await bcrypt.compare(password, loadedUser.password)

        if (!isEqual) {
            const error = new Error("Wrong password!")
            error.statusCode = 404
            res.status(404).json(error)
            throw error
        }

        const token = jwt.sign(
            {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
            },
            "somesupersecretsecret"
        )

        const action = new Activities({
            action: 'Login',
            iduser: loadedUser._id
        })

        await action.save()

        res.status(200).json({ token: token, userId: loadedUser._id.toString() })
            
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}
exports.findUser = async (req, res, next) => {
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

        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error("Không tìm thầy user")
            error.statusCode = 404
            res.status(404).json(error)
            throw error
        }

        res.status(200).json({ user: user })
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}
exports.editProfile = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404
            error.data = errors.array()
            res.status(404).json(error)
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

        const user = await User.findByIdAndUpdate(iduser, dataUpdate)

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
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}
exports.findUserLikeEmail = async (req, res, next) => {
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
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}
exports.FindUserLikeID = async (req, res, next) => {
    try{
        const iduser = req.params.iduser

        const user = await User.findById(iduser)

        res.status(200).json({statusCode: 200,result: user})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}
exports.getListUser = async (req, res, next) => {
    try{
        const user = await User.find({})

        res.status(200).json({statusCode: 200,result: user})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
}