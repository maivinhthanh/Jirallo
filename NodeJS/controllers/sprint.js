const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Sprint = require('../models/sprint')
const Issuses = require('../models/issues')
const Project = require('../models/project')
const Activities = require('../models/activities')

exports.createSprint = async (req, res, next) => {
    try{

        const name = req.body.name
        const idproject = req.body.idproject

        if(!name){
            res.status(203).json({ message: 'Not found Name' })
            return
        }
        
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

        res.status(201).json({ newsprint})
    }
    catch (error) {
        
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
        const sprint = await Sprint.findByIdAndUpdate(idsprint, newsprint, { new: true })

        const action = new Activities({
            action: 'editSprint',
            content: 'sprint/editSprint/' + idsprint,
            iduser: req.userId,
            olddata:sprint,
            newdata: newsprint
        })

        await action.save()

        res.status(201).json({ newsprint})
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

        res.status(201).json({ listsprint: project.idsprint})
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

            res.status(201).json({ newsprint})
        }
        else{
            res.status(203).json({ 
                message: "Sprint haven't complete"
            })
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

        res.status(200).json({ newsprint})
    }
    catch(err) {
        
        next(err)
    }
}
exports.deleteSprint = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const idsprint = req.body.idsprint

        const newsprint = {
            hidden: true,
            dateedit: Date.now(),
        } 
        await Sprint.findByIdAndUpdate(idsprint, newsprint)

        await Project.findByIdAndUpdate(idproject, {
            activesprint: null
        })
        
        const action = new Activities({
            action: 'deleteSprint',
            content: 'sprint/deleteSprint/' + idsprint,
            iduser: req.userId,
        })

        await action.save()

        res.status(200).json({ statusCode: 200 })
    }
    catch(err) {
        
        next(err)
    }
}
exports.viewListIssuesInSprint = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const idsprint = req.body.idsprint
        const iduser = req.body.iduser

        if (idsprint === null || idsprint === undefined)
        {
            let issues
            if(iduser !== null){
                issues = await Issuses.find({
                    $or: [ { "idsprint":{$exists:false} }, { "idsprint": null } ] ,
                    idproject: idproject,
                    assignee: iduser,
                    hidden: false
                })
            }
            else{
                issues = await Issuses.find({
                    $or: [ { "idsprint":{$exists:false} }, { "idsprint": null } ] ,
                    idproject: idproject,
                    hidden: false
                })
            }
            res.status(200).json({ listissues: issues})
        }
        else{
            let sprint
            if(iduser !== null){
                sprint = await Sprint.findById(idsprint).populate({
                    path: 'idissues',
                    match:{
                        hidden: false,
                        assignee: iduser,
                    }
                })
            }
            else{
                sprint = await Sprint.findById(idsprint).populate({
                    path: 'idissues',
                    match:{
                        hidden: false
                    }
                })
            }
    
            res.status(200).json({  listissues: sprint.idissues })
        }

        
    }
    catch(err) {
        
        next(err)
    }
}
exports.addAndSortIssuesInSprint = async (req, res, next) => {
    try{
        const idsprintgive = req.body.idsprintgive
        const idsprinttake = req.body.idsprinttake
        const listissues = req.body.listissues
        const idissues = req.params.idissues

        const list = listissues.filter(item => item !== '')

        if(idsprintgive === null || idsprintgive === 'null'){
            await Sprint.findByIdAndUpdate(idsprinttake,
                {
                    idissues: list  
                } ,{new: true}
            )
            await Issuses.findByIdAndUpdate(idissues, {
                idsprint : idsprinttake 
            })
        }
        else if(idsprinttake === null || idsprinttake === 'null'){
            await Sprint.findByIdAndUpdate(idsprintgive,
                {
                    $pull: { idissues: ObjectId(idissues) } 
                } ,{new: true}
            )
            await Issuses.findByIdAndUpdate(idissues, {
                idsprint : null 
            })
        }
        else if((idsprinttake === null || idsprinttake === 'null') && (idsprintgive === null || idsprintgive === 'null')){

        }
        else{
            await Sprint.findByIdAndUpdate(idsprintgive,
                {
                    $pull: { idissues: ObjectId(idissues) } 
                } ,{new: true}
            )
            await Sprint.findByIdAndUpdate(idsprinttake,
                {
                    idissues: list  
                } ,{new: true}
            )
            await Issuses.findByIdAndUpdate(idissues, {
                idsprint : idsprinttake 
            })
        }

        res.status(200).json({  })

        // const list = listissues.filter(item => item !== '')
        // if(idsprint === null || idsprint === 'null'){
        //     res.status(200).json({  listissues: [] })
        // }
        // else{
        //     const sprint = await Sprint.findByIdAndUpdate(idsprinttake,
        //         {
        //             idissues : list
        //         } ,{new: true}
        //     )
            
        //     await Issuses.findByIdAndUpdate(idissues, {
        //         idsprint : idsprinttake 
        //     })
        //     res.status(200).json({  listissues: sprint.idissues })
        // }

    }
    catch(err) {
        
        next(err)
    }
}