const { validationResult } = require("express-validator/check")
const {ObjectId} = require('mongodb')

const Report = require('../models/report')

exports.addUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const type = req.body.type

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        if(type === 'diagram'){
            const report = await Report.findByIdAndUpdate(idreport,{
                $push:{
                    "usecase.diagram": {
                        image: [],
                        title: ""
                    }
                }
                
            },{ new: true })
            res.status(200).json( {report} )
        }
        else{
            const report = await Report.findByIdAndUpdate(idreport,{
                $push:{
                    "usecase.descript": {
                        title: '',
                        name: '',
                        key: '',
                        briefdescript: [],
                        actor: '',
                        precondition:'',
                        postcondition: '',
                        basicflows: [],
                        exception: [],
                        nametable: '',
                        image:[] 
                    }
                }
                
            },{ new: true })
            res.status(200).json( {report} )
        }
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateTitleUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const type = req.body.type
        const name = req.body.name
        const idusecase = req.body.idusecase

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        if(type === 'diagram'){
            await Report.update(
                {
                    '_id' : ObjectId(idreport)
                },{
                    $set:{
                        "usecase.diagram.$[i].title": name
                    }
                    
                },{
                    arrayFilters: [
                    {
                        'i._id' : ObjectId(idusecase)
                    }
                ]}
            )
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        else{
            await Report.update(
                {
                    '_id' : ObjectId(idreport)
                },{
                    $set:{
                        "usecase.descript.$[i].title": name
                    }
                    
                },{
                    arrayFilters: [
                    {
                        'i._id' : ObjectId(idusecase)
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
exports.deleteImageUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idusecase = req.body.idusecase
        const idimage = req.body.idimage
        const type = req.body.type

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        if(type === 'diagram'){
            await Report.update({
                _id: ObjectId(idreport)
            },{
                $pull:{
                    "usecase.diagram.$[i].image": {"_id":ObjectId(idimage)}
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
                }
            ]})
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        else{
            await Report.update({
                _id: ObjectId(idreport)
            },{
                $set:{
                    "usecase.descript.$[i].image.address": {"_id":ObjectId(idimage)}
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
                }
            ]})
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateImageDiagram = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const iddiagram = req.body.iddiagram
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
                    "usecase.diagram.$[i].image.$[j].name": name,
                    "usecase.diagram.$[i].image.$[j].address": image
                },
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(iddiagram)
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
                    "usecase.diagram.$[i].image.$[j].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(iddiagram)
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
exports.updateImageDescript = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idusecase = req.body.idusecase
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
                    "usecase.descript.$[i].image.$[j].name": name,
                    "usecase.descript.$[i].image.$[j].address": image
                },
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
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
                    "usecase.descript.$[i].image.$[j].name": name
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
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
exports.pushImageUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const type = req.body.type
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const name = req.body.name
        const idusecase = req.body.idusecase

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        if(type === "diagram"){
            await Report.update({
                _id: idreport,
                "usecase.diagram._id": idusecase
            },{
                $push:{
                    "usecase.diagram.$.image": {
                        name: name,
                        address: image
                    }
                }
                
            },{ new: true })
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        else{
            await Report.update({
                _id: idreport,
                "usecase.descript._id": idusecase
            },{
                $push:{
                    "usecase.descript.$.image": {
                        name: name,
                        address: image
                    }
                }
                
            },{ new: true })
            const newreport = await Report.findById(idreport)
            res.status(200).json( {newreport} )
        }
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const key = req.body.key
        const name = req.body.name
        const briefdescript = req.body.briefdescript
        const actor = req.body.actor
        const precondition = req.body.precondition
        const postcondition = req.body.postcondition
        
        const idusecase = req.body.idusecase

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: idreport,
        },{
            $set:{
                'usecase.descript.$[i].key' :key,
                'usecase.descript.$[i].name' :name,
                'usecase.descript.$[i].briefdescript' :briefdescript,
                'usecase.descript.$[i].actor' :actor,
                'usecase.descript.$[i].precondition' :precondition,
                'usecase.descript.$[i].postcondition' :postcondition,
            }
            
        },{
            arrayFilters: [
            {
                'i._id' : ObjectId(idusecase)
            }
            
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateBasicFlows = async (req, res, next) => {
    try{

        const idreport = req.params.idreport        
        const basicflows = req.body.basicflows
        
        const idusecase = req.body.idusecase

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: idreport,
        },{
            $set:{
                'usecase.descript.$[i].basicflows' :basicflows
            }
            
        },{
            arrayFilters: [
            {
                'i._id' : ObjectId(idusecase)
            }
            
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateException = async (req, res, next) => {
    try{

        const idreport = req.params.idreport        
        const exception = req.body.exception
        
        const idusecase = req.body.idusecase

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: idreport,
        },{
            $set:{
                'usecase.descript.$[i].exception' :exception
            }
            
        },{
            arrayFilters: [
            {
                'i._id' : ObjectId(idusecase)
            }
            
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.deleteDiagram = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const iddiagram = req.body.iddiagram
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $pull:{
                    "usecase.diagram": {"_id":ObjectId(iddiagram)}
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
exports.deleteUsecase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idusecase = req.body.idusecase
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $pull:{
                    "usecase.descript": {"_id":ObjectId(idusecase)}
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
exports.deleteFlow = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idusecase = req.body.idusecase
        const idflow = req.body.idflow
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $pull:{
                    'usecase.descript.$[i].basicflows': {"_id":ObjectId(idflow)}
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
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
exports.deleteException = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idusecase = req.body.idusecase
        const idexception = req.body.idexception
    
        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },
            {
                $pull:{
                    'usecase.descript.$[i].exception': {"_id":ObjectId(idexception)}
                }
                
            },{
                arrayFilters: [
                {
                    'i._id' : ObjectId(idusecase)
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