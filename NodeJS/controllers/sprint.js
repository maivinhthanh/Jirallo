const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Sprint = require('../models/sprint')
const Issuses = require('../models/issues')
const Project = require('../models/project')
const Activities = require('../models/activities')

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
        
        next(err)
    }
}

exports.viewListSprint = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const iduser = req.body.iduser

        let project
        if(iduser !== null){
            project = await Project.findById(idproject).populate({
                path: 'idsprint',
                match:{
                    hidden: false,
                    assignee: iduser
                }
            })
        }
        else{
            project = await Project.findById(idproject).populate({
                path: 'idsprint',
                match:{
                    hidden: false
                }
            })
        }

        res.status(201).json({ statusCode: 200 ,listsprint: project.idsprint})
    }
    catch(err) {
        
        next(err)
    }
    
}
exports.beginsprint = async (req, res, next) => {
    try{
        const idsprint = req.body.idsprint
        const idproject = req.params.idproject

        const idsprintactiving = await Project.findById(idproject).activesprint

        if(!idsprintactiving){
            const newsprint = {
                timebegin: Date.now(),
                dateedit: Date.now()
            } 
    
            await Sprint.findByIdAndUpdate(idsprint, newsprint)
            await Project.findByIdAndUpdate(idproject, {
                activesprint: idsprint
            })

            res.status(201).json({ statusCode: 200 ,newsprint})
        }
        else{
            res.status(201).json({ statusCode: 400 ,data: {
                msg: "Sprint haven't complete"
            }})
        }

        const action = new Activities({
            action: 'beginsprint',
            content: 'sprint/beginsprint/' + idproject,
            iduser: req.userId,
            olddata: idsprint
        })

        await action.save()

        
    }
    catch(err) {
        
        next(err)
    }

}
exports.completeSprint = async (req, res, next) => {
    try{
        const idsprint = req.body.idsprint
        const idproject = req.params.idproject

        const infosprint = await Sprint.findById(idsprint).populate({
            path: 'idissues',
            match:{
                hidden: false
            },
            select:['name', 'process', 'type', 'priority', 'tag']
        })

        infosprint.idissues.map((item, index)=>{
            
        })

        const newsprint = {
            isfinish: true,
            timeend: Date.now(),
            report:{
                listissues: clone,

            },
            dateedit: Date.now(),
        } 
        await Sprint.findByIdAndUpdate(idsprint, newsprint)
        await Project.findByIdAndUpdate(idproject, {
            activesprint: null
        })

        const action = new Activities({
            action: 'completeSprint',
            content: 'sprint/completeSprint/' + idproject,
            iduser: req.userId,
            olddata: idsprint
        })

        await action.save()

        res.status(201).json({ statusCode: 200 ,newsprint})
    }
    catch(err) {
        
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
        
        next(err)
    }
}
exports.viewListIssuesInSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint

        const sprint = await Sprint.findById(idsprint).populate({
            path: 'idissues',
            match:{
                hidden: false
            }
        })

        res.status(201).json({ statusCode: 200, listissues: sprint.idissues })
    }
    catch(err) {
        
        next(err)
    }
}
exports.addAndSortIssuesInSprint = async (req, res, next) => {
    try{
        const idsprint = req.params.idsprint
        const listissues = req.body.listissues
        const newissues = req.body.newissues

        const list = listissues.filter(item => item !== '')

        const sprint = await Sprint.findByIdAndUpdate(idsprint,
            {
                idissues : list
            } ,{new: true})
        
        await Issuses.findByIdAndUpdate(newissues, {
            $push: { idsprint : idsprint }
        })
        res.status(201).json({ statusCode: 200, listissues: sprint.idissues })
    }
    catch(err) {
        
        next(err)
    }
}