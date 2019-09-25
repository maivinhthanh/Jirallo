const express = require('express');
const { body } = require('express-validator/check');
const async = require('async')

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express();

const isAuth = require('../middleware/is-auth')

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
            return Promise.reject('E-Mail này đã tồn tại');
          }
        });
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
);

router.post('/findUser',upload.single('avatar'),isAuth,
  [
    body('email')
      .trim()
      .not()
      .isEmpty()
  ], 
  authController.findUser,
);

router.put('/editProfile/:iduser', upload.single('avatar'),isAuth,
  [
    body('email')
      .isEmail().withMessage('Nhập sai email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail này đã tồn tại');
          }
        });
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
);
// router.post('/findInfoUserByEmail',upload.single('avatar'),isAuth,
//   [
//     body('email')
//       .trim()
//       .not()
//       .isEmpty()
//   ], 
//   authController.findInfoUserByEmail,
//  )
module.exports = router;
