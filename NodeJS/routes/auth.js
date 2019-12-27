const express = require('express')
const { body } = require('express-validator/check')
const async = require('async')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')
// const upload = multer({dest: 'images/'})
router.put(
    '/signup', upload.single('avatar'),
    [
        body('email')
        .isEmail().withMessage('Nhập sai email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-Mail này đã tồn tại')
            }
            })
        })
        .normalizeEmail(),
        body('name')
        .trim().escape()
        .not()
        .isEmpty().withMessage('Không bỏ trống tên'),
        body('password')
        .trim()
        .isLength({ min: 5 }).withMessage('Password cần trên 5 ký tự'),
        body('gender')
        .trim()
    ],
    authController.signup,
)

router.post('/login',upload.single('avatar'),
    [
        body('email')
        .trim()
        .not()
        .isEmpty(), 
        body('password')
        .trim()
    ], 
    authController.login,
)

router.post('/refreshToken',upload.single('avatar'),
    authController.refreshToken,
)

router.post('/logout',upload.single('avatar'),
    authController.logout,
)

router.post('/findUser',upload.single('avatar'),isAuth,
    [
        body('email')
        .trim()
        .not()
        .isEmpty()
    ], 
    authController.findUser,
)

router.put('/editProfile/:iduser', upload.single('avatar'),
    [
    ],
    authController.editProfile,
)
router.post('/findUserLikeEmail',upload.single('avatar'),isAuth,
    [
        body('email')
        .trim()
        .not()
        .isEmpty()
    ], 
    authController.findUserLikeEmail,
)
router.get('/findUserID/:iduser',
    [
    ],
    authController.FindUserID,
)
router.get('/getListUser',
    [
    ],
    authController.getListUser,
)
router.post('/loginbyfacebook',upload.single('avatar'),
    [
       
    ], 
    authController.loginbyfacebook,
)
router.post('/loginbygoogle',upload.single('avatar'),
    [
       
    ], 
    authController.loginbygoogle,
)
router.get('/getMyInfo',upload.single('avatar'),isAuth,
    [
       
    ], 
    authController.getMyInfo,
)
router.post('/sendMail',upload.single('avatar'),
    [
       
    ], 
    authController.sendMail,
)
router.post('/changePass',upload.single('avatar'),
    [
       
    ], 
    authController.changePass,
)
module.exports = router
