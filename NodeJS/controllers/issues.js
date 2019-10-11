const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Issues = require('../models/issues')
const Project = require('../models/project')

function delay() {
    return new Promise(resolve => setTimeout(resolve, 300))
}

exports.createIssues = async (req, res, next) => {
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
        const type = req.body.type ? req.body.type : 'task'
        const priority = req.body.priority ? req.body.priority : 'medium'
        const process = req.body.process ? req.body.process : 'todo'
        const idproject = req.body.idproject
        const iduser = req.userId

        const issues = new Issues({
            name: name,
            type: type,
            priority: priority,
            process: process,
            repoter: iduser,
            watch: [iduser],
            idproject: idproject
        })

        const newissues = await issues.save()

        const project = await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idissues: ObjectId(newissues._id)
            }
        },{ new: true })

        res.status(201).json({ statusCode: 200 ,newissues})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
    
}

exports.editIssues = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const name = req.body.name
        const author = req.body.author
        const process = req.body.process
        const type = req.body.type
        const descript = req.body.descript
        if (req.file !== undefined) {
            image = req.file.path
        }
        const issues = await Issues.findByIdAndUpdate(idissues, {
            name: name,
            author: author,
            process: process,
            type: type,
            descript: descript,
            image: image,
            dateedit: Date.now(),
        }, { new: true })

        res.status(201).json({ statusCode: 200 ,issues})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.viewListIssues = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        let listissues = []

        const project = await Project.findById(idproject)
        
        await project.idissues.map(async (item, index)=>{
            const issues = await Issues.findOne({_id:item})
            listissues = [...listissues, issues]
        })

        await delay()

        res.status(201).json({ statusCode: 200 ,listissues})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
    
}
