const express = require('express')
const { body } = require('express-validator/check')

const sprintController = require('../controllers/sprint')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')
const isManager = require('../middleware/is-Manager')

const upload = require('./uploadfile')

router.post('/createSprint',upload.single('avatar'),isAuth,
    
    sprintController.createSprint,
)
router.put('/editSprint/:idsprint',upload.single('avatar'),isAuth, 
    
    sprintController.editSprint,
)
router.put('/beginsprint/:idproject',upload.single('avatar'),isAuth, isManager,
    
    sprintController.beginsprint,
)
router.post('/viewListSprint/:idproject',isAuth,
    sprintController.viewListSprint,
)
router.get('/viewListIssuesInSprint/:idsprint',isAuth,
    sprintController.viewListIssuesInSprint,
)
router.put('/completeSprint/:idproject',upload.single('avatar'),isAuth, 
    
    sprintController.completeSprint,
)
router.put('/deleteSprint/:idproject',upload.single('avatar'),isAuth, 
    
    sprintController.deleteSprint,
)
router.put('/addAndSortIssuesInSprint/:idsprint',upload.single('avatar'),isAuth, 
    
    sprintController.addAndSortIssuesInSprint,
)
module.exports = router