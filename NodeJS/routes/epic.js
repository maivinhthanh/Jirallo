const express = require('express');
const { body } = require('express-validator/check');

const epicController = require('../controllers/epic');

const router = express();

const isAuth = require('../middleware/is-auth')

const upload = require('./uploadfile')

router.post('/createEpic',upload.single('avatar'),isAuth,
  [
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('idproject')
  ], 
  epicController.createEpic,
);
router.put('/editEpic/:idepic',upload.single('avatar'),isAuth, 
  [], 
  epicController.editEpic,
);
router.get('/viewEpic/:idproject',isAuth,
  epicController.viewEpic,
);


module.exports = router;
