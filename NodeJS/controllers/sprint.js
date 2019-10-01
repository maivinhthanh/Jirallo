const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Sprint = require('../models/sprint')
const Project = require('../models/project')

function delay() {
    return new Promise(resolve => setTimeout(resolve, 300))
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

        const project = await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idsprint: ObjectId(newsprint._id)
            }
        },{ new: true })

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
        const sprint = await Sprint.findByIdAndUpdate(idsprint, {
            name: name,
            timebegin: timebegin,
            deadline: deadline,
            dateedit: Date.now(),
        }, { new: true })

        res.status(201).json({ statusCode: 200 ,sprint})
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
