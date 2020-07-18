const express = require('express')

const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')
// const upload = multer({dest: 'images/'})
router.put(
    '/signup', upload.single('avatar'),
    authController.signup,
)

router.post('/login',upload.single('avatar'),
    
    authController.login,
)

router.post('/refreshToken',upload.single('avatar'),
    authController.refreshToken,
)

router.post('/logout',upload.single('avatar'),
    authController.logout,
)

router.post('/findUser',upload.single('avatar'),isAuth,
    
    authController.findUser,
)

router.put('/editProfile/:iduser', upload.single('avatar'),
    
    authController.editProfile,
)
router.put('/editPermission/:iduser', upload.single('avatar'),
    authController.editPermission,
)
router.post('/findUserLikeEmail',upload.single('avatar'),isAuth,
    
    authController.findUserLikeEmail,
)
router.get('/findUserID/:iduser',
    
    authController.FindUserID,
)
router.get('/getListUser',
    
    authController.getListUser,
)
router.post('/loginbyfacebook',upload.single('avatar'),
    
    authController.loginbyfacebook,
)
router.post('/loginbygoogle',upload.single('avatar'),
    
    authController.loginbygoogle,
)
router.get('/getMyInfo',upload.single('avatar'),isAuth,
    
    authController.getMyInfo,
)
router.post('/sendMail',upload.single('avatar'),
    
    authController.sendMail,
)
router.post('/changePass',upload.single('avatar'),
    
    authController.changePass,
)
module.exports = router
