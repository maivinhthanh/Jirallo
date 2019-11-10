const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Epic = require('../models/epic')
const Project = require('../models/project')
const Activities = require('../models/activities')

exports.createEpic = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404
            error.data = errors.array()
            res.status(404).json(error)
            throw error
        }

        const name = req.body.name
        const idproject = req.body.idproject

        const epic = new Epic({
            name: name,
        })

        const newepic = await epic.save()

        await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idepic: ObjectId(newepic._id)
            }
        },{ new: true })

        const action = new Activities({
            action: 'createEpic',
            content: 'epic/createEpic',
            iduser: req.userId,
            newdata: epic
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,newepic})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
    
}

exports.editEpic = async (req, res, next) => {
    try{
        const idepic = req.params.idepic
        const name = req.body.name
        const newepic = {
            name: name,
            dateedit: Date.now(),
        }
        const epic = await Epic.findByIdAndUpdate(idepic, newepic)

        const action = new Activities({
            action: 'editEpic',
            content: 'epic/editEpic/' + idepic,
            iduser: req.userId,
            olddata:{
                name: epic.name
            },
            newdata: newepic
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,epic})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.viewListEpic = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const project = await Project.findById(idproject).populate({
            path: 'idepic',
            match:{
                hidden: false
            }
        })

        res.status(201).json({ statusCode: 200 ,listepic: project.idepic})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
    
}
exports.viewListIssuesInEpic = async (req, res, next) => {
    try{
        const idepic = req.params.idepic

        const epic = await Epic.findById(idepic).populate({
            path: 'idissues',
            match:{
                hidden: false
            }
        })

        res.status(201).json({ statusCode: 200 ,listissues: epic.idissues})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
    
}

