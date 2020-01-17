const express = require('express')
const { body } = require('express-validator/check')

const activitiesController = require('../controllers/activities')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')

router.get('/getAllActivities/:page',upload.single('avatar'),isAuth,
    
    activitiesController.getAllActivities,
)
module.exports = router
