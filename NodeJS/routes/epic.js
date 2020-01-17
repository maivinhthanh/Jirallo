const express = require('express')
const { body } = require('express-validator/check')

const epicController = require('../controllers/epic')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')

router.post('/createEpic',upload.single('avatar'),isAuth,
   
    epicController.createEpic,
)
router.put('/editEpic/:idepic',upload.single('avatar'),isAuth, 
    
    epicController.editEpic,
)
router.get('/viewListEpic/:idproject',isAuth,
    epicController.viewListEpic,
)
router.get('/viewListIssuesInEpic/:idepic',isAuth,
    epicController.viewListIssuesInEpic,
)
module.exports = router
