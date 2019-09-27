const { validationResult } = require("express-validator/check");
const {ObjectId} = require('mongodb');

const Project = require('../models/project');

exports.createProject = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 404;
        error.data = errors.array();
        res.status(404).json(error);
        throw error;
    }
    const name = req.body.name;
    const iduser = req.userId
    const project = new Project({
        name: name,
        idmembers: {
          id: ObjectId(iduser),
          position: 'Manager'
        }
    })
    project.save()
    .then(result => {
        res.status(201).json({ statusCode: 200 ,result});
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(500).json(err);
        next(err);
      });
};
exports.editInfoProject = (req, res, next) => {
  const idproject = req.params.idproject;
  const name = req.body.name;
  const key = req.body.key;
  if (req.file !== undefined) {
    image = req.file.path;
  }
  const description = req.body.description;
  const project = {
      name: name,
      key: key,
      image: image,
      description: description,
      dateedit: Date.now(),
  }
  Project.findByIdAndUpdate(idproject, project, { new: true })
  .then(result => {
      res.status(201).json({ statusCode: 200 ,result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json(err);
      next(err);
    });
};
exports.viewInfoProject = (req, res, next) => {
  const idproject = req.params.idproject;
  Project.findById(idproject).then(result =>{
    res.status(201).json({ statusCode: 200 ,result});
  })
}
exports.AddMember = (req, res, next) => {
  const idproject = req.params.idproject;
  const iduser = req.body.iduser
  const position = req.body.position
  
  Project.findByIdAndUpdate(idproject, {$push: { idmembers: {
    id: ObjectId(iduser),
    position: position
  } }}, { new: true }).then(result =>{
    res.status(201).json({ statusCode: 200 ,result});
  })
}