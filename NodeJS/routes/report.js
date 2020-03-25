const express = require('express')
const { body } = require('express-validator/check')

const reportController = require('../controllers/report')

const router = express()

const isAuth = require('../middleware/AuthMiddleware')

const upload = require('./uploadfile')

router.post('/createReport/:idproject',upload.single('avatar'),isAuth,
    reportController.createReport,
)
router.get('/getReportInProject/:idproject',upload.single('avatar'),isAuth,
    reportController.getReportInProject,
)
router.post('/editCover/:idreport',upload.single('avatar'),isAuth,
    reportController.editCover,
)
router.post('/editIntroduce/:idreport',upload.single('avatar'),isAuth,
    reportController.editIntroduce,
)
router.post('/editSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.editSurvey,
)
module.exports = router
