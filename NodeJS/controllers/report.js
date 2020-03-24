const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Report = require('../models/report')
const Project = require('../models/project')
const Activities = require('../models/activities')

exports.createReport = async (req, res, next) => {
    try{
        
        const name = req.body.name
        const author = req.body.author
        const teacher = req.body.teacher
        const year = req.body.year
        
        const idproject = req.params.idproject
        
        if(!name){
            res.status(203).json({ message: 'Not found Name' })
            return
        }

        const report = new Report({
            name: name,
            author: author,
            teacher: teacher,
            year: year,
            idproject: idproject
        })

        const newreport = await report.save()

        await Project.findByIdAndUpdate(idproject, {
            idreport: ObjectId(newreport._id)
        },{ new: true })

        const action = new Activities({
            action: 'createReport',
            content: 'report/createReport',
            iduser: req.userId,
            newdata: report
        })

        await action.save()

        res.status(201).json({ newreport })
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.getReportInProject = async (req, res, next) => {
    try{

        const idproject = req.params.idproject
        
        if(!idproject){
            res.status(203).json({ message: 'Not found project' })
            return
        }

        const report = await Report.findOne({idproject: idproject})

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.editCover = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        const name = req.body.name
        const author = req.body.author
        const teacher = req.body.teacher
        const year = req.body.year
        const preface = req.body.preface

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.findByIdAndUpdate(idreport,{
            name: name,
            author: author,
            teacher: teacher,
            year: year,
            preface: preface
        },{ new: true })

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.editIntroduce = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        const urgency = req.body.urgency
        const target = req.body.target
        const structure = req.body.structure

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.findByIdAndUpdate(idreport,{
            introduce:{
                urgency: urgency,
                target: target,
                structure: structure
            } 
        },{ new: true })

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
