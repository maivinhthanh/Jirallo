const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Sprint = require('../models/sprint')
const Project = require('../models/project')
const Activities = require('../models/activities')
const Issues = require('../models/issues')

function delay(time = 300) {
    return new Promise(resolve => setTimeout(resolve, time))
}

exports.createSprint = async (req, res, next) => {
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

        const sprint = new Sprint({
            name: name,
        })

        const newsprint = await sprint.save()

        await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idsprint: ObjectId(newsprint._id)
            }
        },{ new: true })

        const action = new Activities({
            action: 'createSprint',
            content: 'sprint/createSprint',
            iduser: req.userId,
            newdata: sprint
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,newsprint})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
    
}

exports.editSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint
        const name = req.body.name
        const timebegin = req.body.timebegin
        const deadline = req.body.deadline
        const newsprint = {
            name: name,
            timebegin: timebegin,
            deadline: deadline,
            dateedit: Date.now(),
        } 
        const sprint = await Sprint.findByIdAndUpdate(idsprint, newsprint)

        const action = new Activities({
            action: 'editSprint',
            content: 'sprint/editSprint/' + idsprint,
            iduser: req.userId,
            olddata:sprint,
            newdata: newsprint
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,newsprint})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.viewListSprint = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        let listsprint = []

        const project = await Project.findById(idproject)
        
        await project.idsprint.map(async (item, index)=>{
            const sprint = await Sprint.findOne({_id:item})
            listsprint = [...listsprint, sprint]
        })

        await delay()

        res.status(201).json({ statusCode: 200 ,listsprint})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
    
}
exports.completeSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint

        const newsprint = {
            isfinish: true,
            dateedit: Date.now(),
        } 
        await Sprint.findByIdAndUpdate(idsprint, newsprint)

        const action = new Activities({
            action: 'completeSprint',
            content: 'sprint/completeSprint/' + idsprint,
            iduser: req.userId,
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,newsprint})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}
exports.deleteSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint

        const newsprint = {
            hidden: true,
            dateedit: Date.now(),
        } 
        await Sprint.findByIdAndUpdate(idsprint, newsprint)

        const action = new Activities({
            action: 'deleteSprint',
            content: 'sprint/deleteSprint/' + idsprint,
            iduser: req.userId,
        })

        await action.save()

        res.status(201).json({ statusCode: 200 })
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}
exports.viewListIssuesInSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint
        let listissues = []

        const sprint = await Sprint.findById(idsprint)

        await sprint.idissues.map(async (item, index)=>{
            const issues = await Issues.findById(item)
            listissues = [...listissues, issues]
        })

        await delay(400)

        res.status(201).json({ statusCode: 200, listissues: listissues })
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}