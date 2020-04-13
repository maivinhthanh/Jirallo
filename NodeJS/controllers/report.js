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
            idproject: idproject,
            survey:[{
                name: '',
                image: [],
                advantages:[],
                defect:[]
            }]
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
exports.updateAuthor = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idsurvey = req.body.idsurvey

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },{
                $set:{
                    "survey.$[i].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idsurvey)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )    
        
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
exports.updateTitleSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idsurvey = req.body.idsurvey

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },{
                $set:{
                    "survey.$[i].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idsurvey)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )    
        
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.editSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        const survey = req.body.survey

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.findByIdAndUpdate(idreport,{
            survey: survey
        },{ new: true })

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.pushImageSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const name = req.body.name
        const idsurvey = req.body.idsurvey

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.update({
            _id: idreport,
            "survey._id": idsurvey
        },{
            $push:{
                "survey.$.image": {
                    name: name,
                    address: image
                }
            }
            
        },{ new: true })
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.deleteImageSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idsurvey = req.body.idsurvey
        const idimage = req.body.idimage

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.update({
            _id: ObjectId(idreport)
        },{
            $pull:{
                "survey.$[i].image": {"_id":ObjectId(idimage)}
            }
            
        },{
            arrayFilters: [
            {
                'i._id' : ObjectId(idsurvey)
            }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.updateImageSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idsurvey = req.body.idsurvey
        const idimage = req.body.idimage
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
            const report = await Report.update({
                '_id' : ObjectId(idreport)
               
            },{
                $set:{
                    "survey.$[i].image.$[j].name": name,
                    "survey.$[i].image.$[j].address": image
                },
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idsurvey)
                },
                {
                    'j._id': ObjectId(idimage)
                }
            ]})
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        else{
            const report = await Report.update({
                '_id' : ObjectId(idreport)
            },{
                $set:{
                    "survey.$[i].image.$[j].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idsurvey)
                },
                {
                    'j._id': ObjectId(idimage)
                }
            ]}
            )
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.addSurvey = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.findByIdAndUpdate(idreport,{
            $push:{
                "survey": {
                    name: '',
                    image: [],
                    advantages:[],
                    defect:[]
                }
            }
            
        },{ new: true })
        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateSetting = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const setting = req.body.setting

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.findByIdAndUpdate(idreport,{
            $set:{
                "setting": setting
            }
            
        },{ new: true })
        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateContentTesting = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idtesting = req.body.idtesting
        const content = req.body.content

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $set:{
                    "testing.$[i].content": content
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtesting)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.addTesting = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $push:{
                    "testing": {
                        title: "",
                        content:[]
                    }
                }
                
            }
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateTitleTesting = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idtesting = req.body.idtesting
        const title = req.body.title

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $set:{
                    "testing.$[i].title": title
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtesting)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.editConclude = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        const result = req.body.result
        const advantages = req.body.advantages
        const defect = req.body.defect
        const development = req.body.development

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.findByIdAndUpdate(idreport,{
            conclude:{
                result: result,
                advantages: advantages,
                defect: defect,
                development: development
            } 
        },{ new: true })

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.editReference = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        const references = req.body.references

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.findByIdAndUpdate(idreport,{
            references: references
        },{ new: true })

        res.status(200).json( {report} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.addTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $push:{
                    "theory": {
                        title: "",
                        content:[],
                        image:[]
                    }
                }
                
            }
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateContentTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idtheory = req.body.idtheory
        const content = req.body.content

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $set:{
                    "theory.$[i].content": content
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtheory)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateTitleTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idtheory = req.body.idtheory
        const title = req.body.title

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $set:{
                    "theory.$[i].title": title
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtheory)
                }
            ]}
        )
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.pushImageTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const name = req.body.name
        const idtheory = req.body.idtheory

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.update({
            _id: idreport,
            "theory._id": idtheory
        },{
            $push:{
                "theory.$.image": {
                    name: name,
                    address: image
                }
            }
            
        },{ new: true })
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.deleteImageTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idtheory = req.body.idtheory
        const idimage = req.body.idimage

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.update({
            _id: ObjectId(idreport)
        },{
            $pull:{
                "theory.$[i].image": {"_id":ObjectId(idimage)}
            }
            
        },{
            arrayFilters: [
            {
                'i._id' : ObjectId(idtheory)
            }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.updateImageTheory = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idtheory = req.body.idtheory
        const idimage = req.body.idimage
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
            await Report.update({
                '_id' : ObjectId(idreport)
               
            },{
                $set:{
                    "theory.$[i].image.$[j].name": name,
                    "theory.$[i].image.$[j].address": image
                },
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtheory)
                },
                {
                    'j._id': ObjectId(idimage)
                }
            ]})
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        else{
            await Report.update({
                '_id' : ObjectId(idreport)
            },{
                $set:{
                    "theory.$[i].image.$[j].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idtheory)
                },
                {
                    'j._id': ObjectId(idimage)
                }
            ]}
            )
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        
    }
    catch (error) {
        
        next(error)
    }
    
}
