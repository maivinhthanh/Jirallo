const express = require('express')
const { body } = require('express-validator/check')

const projectController = require('../controllers/project')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')
const isManager = require('../middleware/is-Manager')
const hasAuthInProject = require('../middleware/hasAuthInProject')

const upload = require('./uploadfile')

router.post('/createProject',upload.single('avatar'),isAuth,
    
    projectController.createProject,
)
router.put('/editInfoProject/:idproject',upload.single('avatar'),isAuth, hasAuthInProject,  isManager,
    
    projectController.editInfoProject,
)
router.get('/viewInfoProject/:idproject',isAuth, hasAuthInProject,
    projectController.viewInfoProject,
)
router.get('/ViewListProject/',isAuth,
    projectController.ViewListProject,
)
router.put('/AddMember/:idproject',upload.single('avatar'),isAuth, hasAuthInProject, isManager,
    
    projectController.AddMember,
)
router.put('/AddProcess/:idproject',upload.single('avatar'),isAuth, hasAuthInProject, isManager,
    
    projectController.AddProcess,
)
router.put('/addAndSortIssuesInBackLog/:idproject',upload.single('avatar'),isAuth, hasAuthInProject,
    
    projectController.addAndSortIssuesInBackLog,
)
router.get('/viewListProject',isAuth, hasAuthInProject,
    projectController.ViewListProject,
)
router.get('/FindProjectByID/:idproject',isAuth, hasAuthInProject,
    projectController.FindProjectByID,
)
router.post('/viewListIssuesInProject/:idproject',isAuth, hasAuthInProject,
    projectController.viewListIssuesInProject,
)
router.get('/getListUserInProject/:idproject',isAuth, hasAuthInProject,
    projectController.getListUserInProject,
)
router.get('/hasAuth/:idproject',isAuth, 
    projectController.hasAuth,
)
router.post('/getIssuesInSprintActive/:idproject',isAuth, hasAuthInProject,
    projectController.getIssuesInSprintActive,
)
router.put('/deleteProcess/:idproject',isAuth, hasAuthInProject,
    projectController.deleteProcess,
)
module.exports = router
