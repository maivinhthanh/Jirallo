const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 404
    error.data = errors.array()
    res.status(404).json( error );
    throw error
  }
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  const gender = req.body.gender
  const image = null
  if(req.file !== undefined){
    image = req.file.path
  }
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        gender: gender,
        image: image
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ statusCode: 200, userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json(err);
      next(err)
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('Không tìm thấy user.');
        error.statusCode = 404;
        res.status(500).json(error)
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 404;
        res.status(404).json(error)
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret'
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json(err);
    });
};
exports.findUser = (req, res, next) => {
  const email = req.body.email
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('Không tìm thầy user');
        error.statusCode = 404;
        res.status(404).json(error)
        throw error;
      }
      res.status(200).json({ user: user })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json(err);
    });
}
exports.editProfile = (req, res, next) =>{
  const iduser = req.params.iduser
  const image = null
  if(req.file !== undefined){
    image = req.file.path
  }
  const user = {
    name: req.body.name,
    image: image,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    dateedit: Date.now()
  }
  User.findByIdAndUpdate(iduser, user,{ 'new': true}).then(e=>{
    res.status(200).json({
      statusCode: 200,
      result: e
    })
  }).catch(err=>{
    if (!err.statusCode) {
      err.statusCode = 500
      res.status(500).json(err);
    }
    next(err)
  })
}
exports.findUserLikeEmail = (req, res, next)=>{
  const email = req.body.email
  User.find({email:{'$regex': email}}).then(e=>{
    if(!e){
      const error = new Error('Không tìm thầy user');
      error.statusCode = 404;
      res.status(404).json(error)
      throw error;
    }
    res.status(200).json({
      statusCode: 200,
      result: e
    })
  }).catch(err=>{
    if (!err.statusCode) {
      err.statusCode = 500
      res.status(500).json(err);
    }
    next(err)
  })
}