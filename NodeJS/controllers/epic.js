const { validationResult } = require("express-validator/check");
const {ObjectId} = require('mongodb');

const Epic = require('../models/epic');
const Project = require('../models/project');

exports.createEpic = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.statusCode = 404;
            error.data = errors.array();
            res.status(404).json(error);
            throw error;
        }
        const name = req.body.name;
        const idproject = req.body.idproject;
        const epic = new Epic({
            name: name,
        })
        const newepic = await epic.save()
        const project = await Project.findByIdAndUpdate(idproject, {$push: { idepic: 
            ObjectId(newepic._id)}
        },{ new: true })
        res.status(201).json({ statusCode: 200 ,project});
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        res.status(500).json(error);
        next(error);
    }
    
};
exports.editEpic = (req, res, next) => {
    const idepic = req.params.idepic;
    const name = req.body.name;
    const epic = {
        name: name,
        dateedit: Date.now(),
    }
    Epic.findByIdAndUpdate(idepic, epic, { new: true })
    .then(result => {
        res.status(201).json({ statusCode: 200 ,result});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(500).json(err);
        next(err);
    });
};
function delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
exports.viewEpic = async (req, res, next) => {
    try{
        const idproject = req.params.idproject;
        const project = await Project.findById(idproject)
        let listepic = []
        await project.idepic.map(async (item, index)=>{
            const epic = await Epic.findOne({_id:item})
            listepic = [...listepic, epic]
        })
        await delay();
        res.status(201).json({ statusCode: 200 ,listepic});
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(500).json(err);
        next(err);
    }
    
}
