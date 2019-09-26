const express = require('express');
const { body } = require('express-validator/check');
const async = require('async')

const Project = require('../models/project');
const projectController = require('../controllers/project');

const router = express();

const isAuth = require('../middleware/is-auth')

const upload = require('./uploadfile')

router.post('/createProject',upload.single('avatar'),isAuth,
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
  ], 
  projectController.createProject,
);
router.put('/editInfoProject/:idproject',upload.single('avatar'),isAuth,
  [], 
  projectController.editInfoProject,
);
router.get('/viewInfoProject/:idproject',isAuth, 
  projectController.viewInfoProject,
);
router.put('/AddMember/:idproject',upload.single('avatar'),isAuth,
  [], 
  projectController.AddMember,
);

module.exports = router;
