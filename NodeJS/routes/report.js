const express = require('express')
const { body } = require('express-validator/check')

const reportController = require('../controllers/report')
const usecaseController = require('../controllers/usecase')
const designController = require('../controllers/design')

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
router.put('/updateDescriptWebsite/:idreport',upload.single('avatar'),isAuth,
    designController.updateDescriptWebsite,
)
router.post('/pushImageDatabase/:idreport',upload.single('avatar'),isAuth,
    designController.pushImageDatabase,
)
router.put('/deleteImageDatabase/:idreport',upload.single('avatar'),isAuth,
    designController.deleteImageDatabase,
)
router.put('/updateImageDatabase/:idreport',upload.single('avatar'),isAuth,
    designController.updateImageDatabase,
)
router.post('/addGroup/:idreport',upload.single('avatar'),isAuth,
    designController.addGroup,
)
router.put('/updateNameGroup/:idreport',upload.single('avatar'),isAuth,
    designController.updateNameGroup,
)
router.put('/addInterface/:idreport',upload.single('avatar'),isAuth,
    designController.addInterface,
)
router.post('/pushImageInterface/:idreport',upload.single('avatar'),isAuth,
    designController.pushImageInterface,
)
router.put('/deleteImageInterface/:idreport',upload.single('avatar'),isAuth,
    designController.deleteImageInterface,
)
router.put('/updateImageInterface/:idreport',upload.single('avatar'),isAuth,
    designController.updateImageInterface,
)
router.put('/updateInterface/:idreport',upload.single('avatar'),isAuth,
    designController.updateInterface,
)
router.put('/updateObject/:idreport',upload.single('avatar'),isAuth,
    designController.updateObject,
)
router.put('/updateSetting/:idreport',upload.single('avatar'),isAuth,
    reportController.updateSetting,
)
router.put('/updateContentTesting/:idreport',upload.single('avatar'),isAuth,
    reportController.updateContentTesting,
)
router.post('/addTesting/:idreport',upload.single('avatar'),isAuth,
    reportController.addTesting,
)
router.put('/updateTitleTesting/:idreport',upload.single('avatar'),isAuth,
    reportController.updateTitleTesting,
)
router.put('/editConclude/:idreport',upload.single('avatar'),isAuth,
    reportController.editConclude,
)
router.put('/editReference/:idreport',upload.single('avatar'),isAuth,
    reportController.editReference,
)
router.post('/addTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.addTheory,
)
router.put('/updateTitleTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.updateTitleTheory,
)
router.put('/updateContentTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.updateContentTheory,
)
router.post('/pushImageTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.pushImageTheory,
)
router.put('/deleteImageTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.deleteImageTheory,
)
router.put('/updateImageTheory/:idreport',upload.single('avatar'),isAuth,
    reportController.updateImageTheory,
)
module.exports = router
