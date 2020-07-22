const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')
const {_} = require("lodash")
const Project = require('../models/project')
const Sprint = require('../models/sprint')
const User = require('../models/user')
const Activities = require('../models/activities')

exports.createProject = async (req, res, next) => {
    try{

        const name = req.body.name
        const iduser = req.userId
        
        if(!name){
            res.status(203).json({ message: 'Not found Name' })
            return
        }

        const project = new Project({
            name: name,
            idmembers: {
                id: ObjectId(iduser),
                position: 'Manager'
            },
            process: ['todo', 'done']
        })

        const newproject = await project.save()

        await User.findByIdAndUpdate(iduser,  {
            $push: { 
                idproject: ObjectId(newproject._id)
            }
        })

        const action = new Activities({
            action: 'createProject',
            content: 'project/createProject',
            iduser: iduser,
            newdata: project
        })

        await action.save()

        res.status(201).json({ newproject})
    }
    catch (error) {
        
        next(error)
    }
}

exports.editInfoProject = async (req, res, next) => {
    try{

        const idproject = req.params.idproject
        const name = req.body.name
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const description = req.body.description

        const project = {
            name: name,
            image: image,
            description: description,
            dateedit: Date.now(),
        }

        const oldproject = await Project.findByIdAndUpdate(idproject, project)

        const action = new Activities({
            action: 'editInfoProject',
            content: 'project/editInfoProject/' + idproject,
            iduser: req.userId,
            olddata: {
                name: oldproject.name,
                image: oldproject.image,
                description: oldproject.description
            },
            newdata: project
        })

        await action.save()

        res.status(200).json({ oldproject})
    }
    catch(err) {
        
        next(err)
    }
}

exports.viewInfoProject = async (req, res, next) => {
    try{
        
        const idproject = req.params.idproject

        const project = await Project.findById(idproject)

        res.status(200).json({ project})
    }
    catch(err) {
        
        next(err)
    }
}

exports.AddMember = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const iduser = req.body.iduser
        const position = req.body.position
        const projectCheck = await Project.findById(idproject)
        if(_.find(projectCheck.idmembers, function(o) {return o.id == iduser })){
            res.status(201).json({ projectCheck})
            return
        }
        const project = await Project.findByIdAndUpdate(idproject, { 
                $push: { 
                    idmembers: {
                        id: ObjectId(iduser),
                        position: position
                    }
                }
        }, { new: true })
        await User.findByIdAndUpdate(iduser, {
            $push: { 
                idproject: ObjectId(idproject)
            }
        },{ new: true })

        const action = new Activities({
            action: 'AddMember',
            content: 'project/AddMember/' + idproject,
            iduser: req.userId,
            newdata: {
                id: ObjectId(iduser),
                position: position
            }
        })

        await action.save()

        res.status(201).json({ project})
    }
    catch(err) {
        next(err)
    }
}
exports.AddProcess = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const process = req.body.process
        
        const project = await Project.findByIdAndUpdate(idproject, { 
            process: process
        }, { new: true })
    
        const action = new Activities({
            action: 'AddProcess',
            content: 'project/AddProcess/' ,
            iduser: req.userId,
            newdata: {
                process: process
            }
        })

        await action.save()

        res.status(200).json({ project: project})
    }
    catch(err) {
        next(err)
    }
}
exports.ViewListProject = async (req, res, next) => {
    try{

        const iduser = req.userId
        const user = await User.findById(iduser).populate('idproject')
        res.status(200).json({ listproject: user.idproject})
    }
    catch(err) {
        next(err)
    }
}
exports.FindProjectByID = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const project = await Project.findById(idproject)

        res.status(200).json({ project: project})
    }
    catch(err) {
        next(err)
    }
}

exports.findProjectLikeName = async (req, res, next) => {
    try{
        const name = req.body.name
        const project = await Project.find({ name: name })
        if (!project) {
            res.status(203).json({message: 'Not found project'})
            return
        }
        res.status(200).json({project})
    }
    catch (error) {
        
        next(error)
    }
}

exports.viewListIssuesInProject = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const user = req.body.user
        let project

        if(user !== null){
            project = await Project.findById(idproject).populate({
                path: 'idissues',
                match:{
                    hidden: false,
                    assignee : ObjectId(user)
                },
                select:['idissues','name', 'assignee', 'process', 'type', 'priority', 'tag']
            })
        }
        else{
            project = await Project.findById(idproject).populate({
                path: 'idissues',
                match:{
                    hidden: false,
                },
                select:['idissues','name', 'assignee', 'process', 'type', 'priority', 'tag']
            })
        }
        

        res.status(200).json({ project: project.idissues})
    }
    catch(err) {
        next(err)
    }
}
exports.getListUserInProject = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const project = await Project.findById(idproject).populate({
            path: 'idmembers.id',
            match:{
                hidden: false
            },
        })

        res.status(200).json({ listuser: project.idmembers})
    }
    catch(err) {
        next(err)
    }
}
exports.addAndSortIssuesInBackLog = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const listissues = req.body.listissues

        const project = await Project.findByIdAndUpdate(idproject,
            {
                idissues : listissues
            } ,{new: true})

        res.status(200).json({  listissues: project.idissues })
    }
    catch(err) {
        
        next(err)
    }
}
exports.hasAuth = async (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject
    let flag = false
    let position = ''

    await Project.findById(idproject).then(e=>{
        e.idmembers.map((item, index)=>{

            if(item.id.toString() === userId){
                flag = true
                position = item.position
            }
        })
        
    })

    res.status(200).json({ hasAuth: flag, position })

}
exports.isManager = async (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject
    let flag = false

    await Project.findById(idproject).then(e=>{
        e.idmembers.map((item, index)=>{

            if(item.id.toString() === userId && item.position === "manager"){
                flag = true
            }
        })
        
    })

    res.status(200).json({  hasAuth: flag })

}
exports.isTeacher = async (req, res, next) => {
    const userId = req.userId
    const idproject = req.params.idproject
    let flag = false

    await Project.findById(idproject).then(e=>{
        e.idmembers.map((item, index)=>{

            if(item.id.toString() === userId && item.position === "teacher"){
                flag = true
            }
        })
        
    })

    res.status(200).json({  hasAuth: flag })

}
exports.getIssuesInSprintActive = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const user = req.body.user
        let sprint

        const project = await Project.findById(idproject)
        const idsprintactive = project.activesprint
        
        if(user !== null){
            sprint = await Sprint.findById(idsprintactive).populate({
                path: 'idissues',
                match:{
                    hidden: false,
                    assignee : ObjectId(user)
                },
                select:['idissues','name', 'assignee', 'process', 'type', 'priority', 'tag']
            })
        }
        else{
            sprint = await Sprint.findById(idsprintactive).populate({
                path: 'idissues',
                match:{
                    hidden: false,
                },
                select:['idissues','name', 'assignee', 'process', 'type', 'priority', 'tag']
            })
        }
        

        res.status(200).json({ idissues: sprint.idissues})
    }
    catch(err) {
        
        next(err)
    }
}
exports.deleteProcess = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const nameProcess = req.body.nameProcess

        const project = await Project.findByIdAndUpdate(idproject, {
            $pull: { process: { $in: [ nameProcess ] } }
        },{ new: true })

        res.status(200).json(project)
    }
    catch(err) {
        
        next(err)
    }
}
exports.deleteMember = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const iduser = req.body.iduser

        const project = await Project.findByIdAndUpdate(idproject, {
            $pull: { idmembers: { $in: {id: iduser} } }
        },{ new: true })

        res.status(200).json(project)
    }
    catch(err) {
        
        next(err)
    }
}

exports.editPositionMember = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const iduser = req.body.iduser
        const position = req.body.position

        await Project.update(
            {
                '_id' : ObjectId(idproject)
            },{
                $set:{
                    "idmembers.$[i].position": position
                }
                
            },{
                arrayFilters: [
                {
                    'i.id' : ObjectId(iduser)
                }
            ]}
        )
        const project = await Project.findById(idproject)
        res.status(200).json(project)
    }
    catch(err) {
        
        next(err)
    }
}

async function calculatorProgressProject(idproject){
    const project = await Project.findById(idproject).populate({
        path: 'idissues',
        match:{
            hidden: false,
        },
        select:['idissues','name', 'assignee', 'process', 'type', 'priority', 'tag']
    })

    const length = project.idissues.length === 0 ? 1 : project.idissues.length
    let count = 0
    let obj = {}
    await project.idissues.forEach((item, index) => {
        if(Object.keys(obj).includes(item.process)){
            obj[item.process] = obj[item.process] + 1
        }
        else{
            obj[item.process] = 1
        }
        // if(item.process === "done"){
        //     count++
        // }
    })

    return  {length, obj}//Math.round(count/length*100)

}

exports.calProgressProject = async (req, res, next) => {
    try{
        const idproject = req.params.idproject

        const progress = await calculatorProgressProject(idproject)

        res.status(200).json(progress)
    }
    catch(err) {
        
        next(err)
    }
}