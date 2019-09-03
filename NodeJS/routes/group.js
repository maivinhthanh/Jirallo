const express = require('express')
const { body } = require('express-validator/check')

const groupController = require('../controllers/group')

const router = express.Router()

const isAuth = require('../middleware/is-auth')
const upload = require('./uploadfile')

router.post(
    '/createGroup',upload.single('avatar'),
    isAuth,
    [
        body('name')
        .trim()
        .not()
        .isEmpty(), 
    ],
    groupController.createGroup
)

router.get(
    '/getGroup/:name',
    isAuth,
    groupController.getGroup
)

router.put(
    '/addMember',upload.single('avatar'),
    isAuth,
    groupController.addMember
)
router.put(
    '/deleteMember',upload.single('avatar'),
    isAuth,
    groupController.deleteMember
)
module.exports = router;