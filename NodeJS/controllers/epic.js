const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Epic = require('../models/epic')
const Project = require('../models/project')
const Activities = require('../models/activities')

exports.createEpic = async (req, res, next) => {
    try{
        
        const name = req.body.name
        const idproject = req.body.idproject
        
        if(!name){
            res.status(203).json({ message: 'Not found Name' })
            return
        }

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

        res.status(201).json({ newepic})
    }
    catch (error) {
        
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
        const epic = await Epic.findByIdAndUpdate(idepic, newepic,{ new: true })

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

        res.status(201).json({ epic})
    }
    catch(err) {
        
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

        res.status(201).json({ listepic: project.idepic})
    }
    catch(err) {
        
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

        res.status(201).json({ listissues: epic.idissues})
    }
    catch(err) {
        
        next(err)
    }
    
}

