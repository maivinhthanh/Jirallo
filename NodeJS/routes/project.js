const express = require('express')
const { body } = require('express-validator/check')

const projectController = require('../controllers/project')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')
const isManager = require('../middleware/is-Manager')

const upload = require('./uploadfile')

router.post('/createProject',upload.single('avatar'),isAuth,
    [
        body('name')
        .trim()
        .not()
        .isEmpty()
    ], 
    projectController.createProject,
)
router.put('/editInfoProject/:idproject',upload.single('avatar'),isAuth,  isManager,
    [], 
    projectController.editInfoProject,
)
router.get('/viewInfoProject/:idproject',isAuth,
    projectController.viewInfoProject,
)
router.get('/ViewListProject/',isAuth,
    projectController.ViewListProject,
)
router.put('/AddMember/:idproject',upload.single('avatar'),isAuth, isManager,
    [], 
    projectController.AddMember,
)
router.put('/addAndSortIssuesInBackLog/:idproject',upload.single('avatar'),isAuth,
    [], 
    projectController.addAndSortIssuesInBackLog,
)
router.get('/viewListProject',isAuth,
    projectController.ViewListProject,
)
router.get('/FindProjectByID/:idproject',isAuth,
    projectController.FindProjectByID,
)
router.get('/viewListIssuesInProject/:idproject',isAuth,
    projectController.viewListIssuesInProject,
)
router.get('/getListUserInProject/:idproject',isAuth,
    projectController.getListUserInProject,
)
module.exports = router
