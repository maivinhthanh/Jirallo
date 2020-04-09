const express = require('express')
const { body } = require('express-validator/check')

const reportController = require('../controllers/report')
const usecaseController = require('../controllers/usecase')

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
router.post('/pushImageSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.pushImageSurvey,
)
router.post('/addSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.addSurvey,
)
router.put('/updateImageSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.updateImageSurvey,
)
router.put('/deleteImageSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.deleteImageSurvey,
)
router.put('/updateTitleSurvey/:idreport',upload.single('avatar'),isAuth,
    reportController.updateTitleSurvey,
)
router.post('/addUsecase/:idreport',upload.single('avatar'),isAuth,
    usecaseController.addUsecase,
)
router.put('/updateTitleUsecase/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateTitleUsecase,
)
router.put('/updateImageDiagram/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateImageDiagram,
)
router.put('/updateImageDescript/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateImageDescript,
)
router.put('/deleteImageUsecase/:idreport',upload.single('avatar'),isAuth,
    usecaseController.deleteImageUsecase,
)
router.post('/pushImageUsecase/:idreport',upload.single('avatar'),isAuth,
    usecaseController.pushImageUsecase,
)
router.put('/updateUsecase/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateUsecase,
)
router.put('/updateBasicFlows/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateBasicFlows,
)
router.put('/updateException/:idreport',upload.single('avatar'),isAuth,
    usecaseController.updateException,
)
module.exports = router
