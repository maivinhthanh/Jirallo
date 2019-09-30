const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Epic = require('../models/epic')
const Project = require('../models/project')

function delay() {
    return new Promise(resolve => setTimeout(resolve, 300))
}

exports.createEpic = async (req, res, next) => {
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

        const epic = new Epic({
            name: name,
        })

        const newepic = await epic.save()

        const project = await Project.findByIdAndUpdate(idproject, {
            $push: { 
                idepic: ObjectId(newepic._id)
            }
        },{ new: true })

        res.status(201).json({ statusCode: 200 ,newepic})
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        res.status(500).json(error)
        next(error)
    }
    
}

exports.editEpic = async (req, res, next) => {
    try{
        const idepic = req.params.idepic
        const name = req.body.name
        const epic = await Epic.findByIdAndUpdate(idepic, {
            name: name,
            dateedit: Date.now(),
        }, { new: true })

        res.status(201).json({ statusCode: 200 ,epic})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.viewListEpic = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        let listepic = []

        const project = await Project.findById(idproject)
        
        await project.idepic.map(async (item, index)=>{
            const epic = await Epic.findOne({_id:item})
            listepic = [...listepic, epic]
        })

        await delay()

        res.status(201).json({ statusCode: 200 ,listepic})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
    
}
