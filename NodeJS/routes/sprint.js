const express = require('express')
const { body } = require('express-validator/check')

const sprintController = require('../controllers/sprint')

const router = express()

const isAuth = require('../middleware/is-auth')

const upload = require('./uploadfile')

router.post('/createSprint',upload.single('avatar'),isAuth,
    [
        body('name')
        .trim()
        .not()
        .isEmpty(),
        body('idproject')
    ], 
    sprintController.createSprint,
)
router.put('/editSprint/:idsprint',upload.single('avatar'),isAuth, 
    [], 
    sprintController.editSprint,
)
router.get('/viewListSprint/:idproject',isAuth,
    sprintController.viewListSprint,
)
router.get('/viewListIssuesInSprint/:idsprint',isAuth,
    sprintController.viewListIssuesInSprint,
)
router.put('/completeSprint/:idsprint',upload.single('avatar'),isAuth, 
    [], 
    sprintController.completeSprint,
)
router.put('/deleteSprint/:idsprint',upload.single('avatar'),isAuth, 
    [], 
    sprintController.deleteSprint,
)

module.exports = router