const { validationResult } = require('express-validator/check')

const User = require('../models/user')
const Group = require('../models/group')

exports.createGroup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const name = req.body.name
  const group = new Group({
    name: name,
    manager: req.userId
  })
  group
    .save()
    .then(result=>{
      res.status(201).json({ statusCode: 200, userId: result._id })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
    })
}

exports.getGroup = (req, res, next) => {
  const name = req.params.name
 
  Group.findOne({name : name})
    .then(result =>{
      if(!result){
        const err = new Error("Không có giá trị")
        err.statusCode = 404
        throw err
      }
      res.status(200).json({
        statusCode: 200,
        result: result
      })

    })
    .catch(err=>{
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.addMember = (req, res, next) => {
  const email = req.body.email
  const idGroup = req.body.idGroup
  let idMember
  
  User.findOne({email: email})
    .then(result =>{
      if(!result){
        const err = new Error("Không có user")
        err.statusCode = 404
        throw err
      }
      idMember = result._id
      Group.findById(idGroup)
        .then(result =>{
          if(!result){
            const err = new Error("Không có group")
            err.statusCode = 404
            throw err
          }
          const group = result
          const finduser = group.members.findIndex(e=>e.members === idMember)
          if(finduser !== -1){
            const err = new Error("Thành viên đã có trong group")
            err.statusCode = 404
            throw err
          }
          
          Group.findByIdAndUpdate(idGroup,{$push: { members: result._id }},{ 'new': true}).then(e=>{
            User.findByIdAndUpdate(idMember,{$push: { idgroup: idGroup }},{ 'new': true}).then(f=>{
              res.status(200).json({
                statusCode: 200,
                result: e
              })
            })
          }).catch(err=>{
            if (!err.statusCode) {
              err.statusCode = 500
            }
            next(err)
          })
        }).catch(err=>{
          if (!err.statusCode) {
            err.statusCode = 500
          }
          next(err)
        })

    })
    .catch(err=>{
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteMember = (req, res, next) => {
  const idMember = req.body.idMember
  const idGroup = req.body.idGroup

  Group.findByIdAndUpdate(idGroup,{ $pull: { members: idMember } }).then(e=>{
    User.findByIdAndUpdate(idMember,{ $pull: { members: idGroup } }).then(f=>{
      res.status(200).json({
        statusCode: 200,
        result: e
      })
    }).catch(err=>{
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
  }).catch(err=>{
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  })
    
    
}