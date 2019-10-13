const express = require('express')
const { body } = require('express-validator/check')

const issuesController = require('../controllers/issues')

const router = express()

const isAuth = require('../middleware/is-auth')

const upload = require('./uploadfile')

router.post('/createIssues',upload.single('image'),isAuth,
    [
        body('name')
        .trim()
        .not()
        .isEmpty()
    ], 
    issuesController.createIssues,
)
router.put('/editIssues/:idissues',upload.single('image'),isAuth, 
    [], 
    issuesController.editIssues,
)
router.get('/viewListIssues/:idproject',isAuth,
    issuesController.viewListIssues,
)
router.put('/assignforUser/:idissues',upload.single('image'),isAuth, 
    [], 
    issuesController.assignforUser,
)

module.exports = router
