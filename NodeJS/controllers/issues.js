const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Issues = require('../models/issues')
const Project = require('../models/project')
const Sprint = require('../models/sprint')
const Activities = require('../models/activities')

exports.createIssues = async (req, res, next) => {
    try{

        const name = req.body.name
        const type = req.body.type ? req.body.type : 'task'
        const priority = req.body.priority ? req.body.priority : 'medium'
        const process = req.body.process ? req.body.process : 'todo'
        const tag = req.body.tag ? req.body.tag : null
        const idproject = req.body.idproject
        const iduser = req.userId

        if(!name){
            res.status(203).json({ message: 'Not found Name' })
            return
        }
        
        const issues = new Issues({
            name: name,
            type: type,
            priority: priority,
            process: process,
            tag: tag,
            repoter: iduser,
            watch: [iduser],
            idproject: idproject,
            idsprint: null
        })

        const newissues = await issues.save()

        await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idissues: ObjectId(newissues._id)
            }
        },{ new: true })

        const action = new Activities({
            action: 'createIssues',
            content: 'issues/createIssues',
            iduser: req.userId,
            newdata: issues
        })

        await action.save()

        res.status(201).json({ newissues})
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.createIssuesInSprint = async (req, res, next) => {
    try{

        const name = req.body.name
        const type = req.body.type ? req.body.type : 'task'
        const priority = req.body.priority ? req.body.priority : 'medium'
        const process = req.body.process ? req.body.process : 'todo'
        const tag = req.body.tag ? req.body.tag : null
        const idproject = req.body.idproject
        const idsprint = req.body.idsprint
        const iduser = req.userId

        const issues = new Issues({
            name: name,
            type: type,
            priority: priority,
            process: process,
            tag: tag,
            repoter: iduser,
            watch: [iduser],
            idsprint:idsprint,
            idproject: idproject
        })

        const newissues = await issues.save()

        await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idissues: ObjectId(newissues._id)
            }
        },{ new: true })

        await Sprint.findByIdAndUpdate(idsprint, 
            {
                $push: {idissues: ObjectId(newissues._id)}
            }, { new: true }
        )

        const action = new Activities({
            action: 'createIssuesInSprint',
            content: 'issues/createIssuesInSprint',
            iduser: req.userId,
            newdata: issues
        })

        await action.save()

        res.status(201).json({ newissues})
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.editIssues = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const name = req.body.name
        const process = req.body.process
        const priority = req.body.priority
        const type = req.body.type
        const tag = req.body.tag
        const descript = req.body.descript
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }

        let newissues = {
            name: name,
            type: type,
            priority: priority,
            process: process,
            descript: descript,
            image: image,
            tag: tag,
            dateedit: Date.now(),
        }
        const issues = await Issues.findByIdAndUpdate(idissues, newissues, { new: true })

        const action = new Activities({
            action: 'editIssues',
            content: 'issues/editIssues/' + idissues,
            iduser: req.userId,
            olddata: issues,
            newdata: newissues
        })

        await action.save()

        newissues = {...newissues, id: idissues}

        res.status(201).json({ newissues})
    }
    catch(err) {
        
        next(err)
    }
}

exports.viewListIssues = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const project = await Project.findById(idproject).populate('idissues')

        res.status(201).json({ listissues: project.idissues})
    }
    catch(err) {
        
        next(err)
    }
    
}
exports.viewListIssuesInBackLog = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const iduser = req.body.iduser

        let issues

        if(iduser !== null){
            issues = await Issues.find({
                $or: [ { "idsprint":{$exists:false} }, { "idsprint": null } ] ,
                idproject: idproject,
                assignee: iduser,
                hidden: false
            })
        }
        else{
            issues = await Issues.find({
                $or: [ { "idsprint":{$exists:false} }, { "idsprint": null } ] ,
                idproject: idproject,
                hidden: false
            })
        }

        res.status(201).json({ listissues: issues})
    }
    catch(err) {
        
        next(err)
    }
    
}
exports.assignforUser = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const iduser = req.body.iduser

        const issues = await Issues.findById(idissues)

        if(iduser === issues.assignee){
            const error = new Error("User had assign")
            error.statusCode = 404
            error.data = errors.array()
            res.status(404).json(error)
            throw error
        }

        const dataupdate = {
            assignee: iduser
        }

        await Issues.findByIdAndUpdate(idissues, dataupdate)

        const action = new Activities({
            action: 'assignforUser',
            content: 'issues/assignforUser/' + idissues,
            iduser: req.userId,
            olddata: issues.assignee,
            newdata: iduser
        })

        await action.save()

        res.status(201).json({ data:dataupdate})

    }
    catch(err) {
        
        next(err)
    }
    
}

exports.addIssueIntoSprint = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const idsprint = req.body.idsprint
        await Sprint.findByIdAndUpdate(idsprint,
            {
                $push: {idissues: (idissues)}
            },{ new: true }
        )
       
        await Issues.findByIdAndUpdate(idissues, 
            {
                idsprint: idsprint
            }, { new: true }
        )
        const sprint = await Sprint.findById(idsprint).populate('idissues')

        const action = new Activities({
            action: 'addIssueIntoSprint',
            content: 'issues/addIssueIntoSprint/' + idissues,
            iduser: req.userId,
            newdata: {idsprint: idsprint, idsprint: idsprint}
        })

        await action.save()

        res.status(201).json({  listissues: sprint.idissues })

    }
    catch(err) {
        
        next(err)
    }
    
}

exports.changeProcessIssues = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const process = req.body.process

        const dataupdate = {
            process: process
        }

        const issues = await Issues.findByIdAndUpdate(idissues, dataupdate, { new: true })

        const action = new Activities({
            action: 'changeProcessIssues',
            content: 'issues/changeProcessIssues/' + idissues,
            iduser: req.userId,
            olddata: issues.process,
            newdata: process
        })
      
        await action.save()

        res.status(201).json({ issues:issues})

    }
    catch(err) {
        
        next(err)
    }
    
}
exports.getInfoIssues = async (req, res, next) => {
    try{
        const idissues = req.params.idissues

        const dataupdate = {
            process: process
        }

        const issues = await Issues.findById(idissues).populate({
            path: 'idsprint',
            match:{
                hidden: false,
            },
            select:['idsprint','name']
        }).populate({
            path: 'idepic',
            match:{
                hidden: false,
            },
            select:['idepic','name']
        }).populate({
            path: 'idproject',
            match:{
                hidden: false,
            },
            select:['idproject','name']
        }).populate({
            path: 'repoter',
            match:{
                hidden: false,
            },
            select:['idproject','name', 'avatar', 'image']
        }).populate({
            path: 'assignee',
            match:{
                hidden: false,
            },
            select:['idproject','name', 'avatar', 'image']
        })

        res.status(201).json({ issues:issues})

    }
    catch(err) {
        
        next(err)
    }
    
}
exports.deleteIssues = async (req, res, next) => {
    try{
        const idissues = req.params.idissues

        const dataupdate = {
            hidden: true
        }

        await Issues.findByIdAndUpdate(idissues, dataupdate,{ new: true })

        const action = new Activities({
            action: 'deleteIssues',
            content: 'issues/deleteIssues/' + idissues,
            iduser: req.userId,
        })

        await action.save()

        res.status(201).json({ statusCode: 200 })

    }
    catch(err) {
        
        next(err)
    }
    
}