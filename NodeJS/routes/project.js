const express = require('express')
const { body } = require('express-validator/check')

const groupController = require('../controllers/group')

const router = express.Router()

const isAuth = require('../middleware/is-auth')
const upload = require('./uploadfile')

router.post(
    '/createProject',
    isAuth,
    [
        body('name')
        .trim()
        .not()
        .isEmpty(), 
    ],
    groupController.createGroup
)

module.exports = router;