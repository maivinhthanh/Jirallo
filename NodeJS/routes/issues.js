const express = require('express')
const { body } = require('express-validator/check')

const issuesController = require('../controllers/issues')
const commentController = require('../controllers/comment')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')

router.post('/createIssues',upload.single('image'),isAuth,
    
    issuesController.createIssues,
)
router.post('/createIssuesInSprint',upload.single('image'),isAuth,
    
    issuesController.createIssuesInSprint,
)
router.put('/editIssues/:idissues',upload.single('image'),isAuth, 
    
    issuesController.editIssues,
)
router.get('/viewListIssues/:idproject',isAuth,
    issuesController.viewListIssues,
)
router.post('/viewListIssuesInBackLog/:idproject',isAuth,
    issuesController.viewListIssuesInBackLog,
)
router.put('/assignforUser/:idissues',upload.single('image'),isAuth, 
    
    issuesController.assignforUser,
)
router.put('/addIssueIntoSprint/:idissues',upload.single('image'),isAuth, 
    
    issuesController.addIssueIntoSprint,
)
router.put('/changeProcessIssues/:idissues',upload.single('image'),isAuth, 
    
    issuesController.changeProcessIssues,
)
router.get('/getInfoIssues/:idissues',isAuth,
    issuesController.getInfoIssues,
)
router.put('/deleteIssues/:idissues',upload.single('image'),isAuth, 
    
    issuesController.deleteIssues,
)
router.post('/filterListIssues/:idproject',isAuth, 
    
    issuesController.filterListIssues,
)

router.post('/createComment/:idissues',upload.single('image'),isAuth,
    commentController.createComment,
)
router.get('/getListComment/:idissue', isAuth,
    commentController.getListComment,
)
module.exports = router
