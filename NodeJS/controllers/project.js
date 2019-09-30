const { validationResult } = require("express-validator/check");
const {ObjectId} = require('mongodb');

const Project = require('../models/project');
const User = require('../models/user');

exports.createProject = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404;
            error.data = errors.array()
            res.status(404).json(error)
            throw error;
        }

        const name = req.body.name
        const iduser = req.userId

        const project = new Project({
            name: name,
            idmembers: {
            id: ObjectId(iduser),
            position: 'Manager'
            }
        })

        const newproject = await project.save()

        const user = findByIdAndUpdate(iduser,  {
            $push: { 
                idproject: ObjectId(newproject._id)
            }
        },{ new: true })

        res.status(201).json({ statusCode: 200 ,newproject});
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        res.status(500).json(error);
        next(error);
    }
}

exports.editInfoProject = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404;
            error.data = errors.array()
            res.status(404).json(error)
            throw error;
        }

        const idproject = req.params.idproject
        const name = req.body.name
        const key = req.body.key
        if (req.file !== undefined) {
            image = req.file.path
        }
        const description = req.body.description

        const project = {
            name: name,
            key: key,
            image: image,
            description: description,
            dateedit: Date.now(),
        }

        const newproject = await Project.findByIdAndUpdate(idproject, project, { new: true })

        res.status(201).json({ statusCode: 200 ,newproject});
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.viewInfoProject = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.")
            error.statusCode = 404;
            error.data = errors.array()
            res.status(404).json(error)
            throw error;
        }
        
        const idproject = req.params.idproject;

        const project = await Project.findById(idproject)

        res.status(201).json({ statusCode: 200 ,project})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.AddMember = async (req, res, next) => {
    try{
        const idproject = req.params.idproject
        const iduser = req.body.iduser
        const position = req.body.position
        
        const project = await Project.findByIdAndUpdate(idproject, { 
                $push: { 
                    idmembers: {
                        id: ObjectId(iduser),
                        position: position
                    }
                }
        }, { new: true })

        res.status(201).json({ statusCode: 200 ,project})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}

exports.ViewListProject = async (req, res, next) => {
    try{

        const iduser = req.userId
        const user = await User.findById(iduser)
        let listproject = []

        await user.idproject.map(async (item, index)=>{
            const project = await Project.findOne({_id:item})
            listproject = [...listproject, project]
        })

        await delay()

        res.status(201).json({ statusCode: 200 ,listproject})
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        res.status(500).json(err)
        next(err)
    }
}