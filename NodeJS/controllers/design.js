const {ObjectId} = require('mongodb')

const Report = require('../models/report')

exports.updateDescriptWebsite = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const descript = req.body.descript

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update(
            {
                '_id' : ObjectId(idreport)
            },{
                $set:{
                    "descriptionWebsite": descript
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
exports.pushImageDatabase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const name = req.body.name

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.update({
            _id: idreport,
        },{
            $push:{
                "database.image": {
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
exports.deleteImageDatabase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idimage = req.body.idimage

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        const report = await Report.update({
            _id: ObjectId(idreport)
        },{
            $pull:{
                "database.image": {"_id":ObjectId(idimage)}
            }
            
        })
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.updateImageDatabase = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
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
                    "database.image.$[i].name": name,
                    "database.image.$[i].address": image
                },
                
            },{
                arrayFilters: [
                {
                    'i._id': ObjectId(idimage)
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
                    "database.image.$[i].name": name
                }
                
            },{
                arrayFilters: [
            
                {
                    'i._id': ObjectId(idimage)
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
exports.addGroup = async (req, res, next) => {
    try{

        const idreport = req.params.idreport

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        const report = await Report.findByIdAndUpdate(idreport,{
            $push:{
                "ui": {
                    content: [],
                    group: ""
                }
            }
            
        },{ new: true })
        res.status(200).json( {report} )
        
        
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateNameGroup = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idgroup = req.body.idgroup

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update({
            '_id' : ObjectId(idreport)
        },{
            $set:{
                "ui.$[i].group": name
            }
            
        },{
            arrayFilters: [
        
            {
                'i._id': ObjectId(idgroup)
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
exports.addInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update({
            '_id' : ObjectId(idreport)
        },{
            $push:{
                "ui.$[i].content": {
                    title:"",
                    image:[],
                    descript:"",
                    listobject:[],
                    nametable:""
                }
            }
            
        },{
            arrayFilters: [
        
            {
                'i._id': ObjectId(idgroup)
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
exports.pushImageInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui

        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        const name = req.body.name

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }
        await Report.update({
            _id: idreport,
        },{
            $push:{
                "ui.$[i].content.$[j].image": {
                    name: name,
                    address: image
                }
            }
            
        },{
            arrayFilters: [
                {
                    'i._id': ObjectId(idgroup)
                },
                {
                    'j._id': ObjectId(idui)
                }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.deleteImageInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui
        const idimage = req.body.idimage

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: ObjectId(idreport)
        },{
            $pull:{
                "ui.$[i].content.$[j].image": {"_id":ObjectId(idimage)}
            }
            
        },{
            arrayFilters: [
                {
                    'i._id': ObjectId(idgroup)
                },
                {
                    'j._id': ObjectId(idui)
                }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}

exports.updateImageInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const name = req.body.name
        const idgroup = req.body.idgroup
        const idui = req.body.idui
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
                    "ui.$[i].content.$[j].image.$[k].name": name,
                    "ui.$[i].content.$[j].image.$[k].address": image
                },
                
            },{
                arrayFilters: [
                    {
                        'i._id': ObjectId(idgroup)
                    },
                    {
                        'j._id': ObjectId(idui)
                    },
                    {
                        'k._id': ObjectId(idimage)
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
                    "ui.$[i].content.$[j].image.$[k].name": name
                }
                
            },{
                arrayFilters: [
                    {
                        'i._id': ObjectId(idgroup)
                    },
                    {
                        'j._id': ObjectId(idui)
                    },
                    {
                        'k._id': ObjectId(idimage)
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
exports.updateInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui
        const title = req.body.title
        const descript = req.body.descript

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: ObjectId(idreport)
        },{
            $set:{
                "ui.$[i].content.$[j].title": title,
                "ui.$[i].content.$[j].descript": descript
            }
            
        },{
            arrayFilters: [
                {
                    'i._id': ObjectId(idgroup)
                },
                {
                    'j._id': ObjectId(idui)
                }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.updateObject = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui
        const listobject = req.body.listobject

        if(!idreport){
            res.status(203).json({ message: 'Not found report' })
            return
        }

        await Report.update({
            _id: ObjectId(idreport)
        },{
            $set:{
                "ui.$[i].content.$[j].listobject": listobject,
            }
            
        },{
            arrayFilters: [
                {
                    'i._id': ObjectId(idgroup)
                },
                {
                    'j._id': ObjectId(idui)
                }
        ]})
        const newreport = await Report.findById(idreport)
        res.status(200).json( {newreport} )
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.deleteGroupInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
    
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
                    "ui": {"_id":ObjectId(idgroup)}
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
exports.deleteInterface = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui
    
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
                    "ui.$[i].content": {"_id":ObjectId(idui)}
                }
                
            },
            {
                arrayFilters: [
                    {
                        'i._id': ObjectId(idgroup)
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
exports.deleteInterfaceObject = async (req, res, next) => {
    try{

        const idreport = req.params.idreport
        const idgroup = req.body.idgroup
        const idui = req.body.idui
        const idobject = req.body.idobject
    
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
                    "ui.$[i].content.$[j].listobject": {"_id":ObjectId(idobject)}
                }
                
            },
            {
                arrayFilters: [
                    {
                        'i._id': ObjectId(idgroup)
                    },
                    {
                        'j._id': ObjectId(idui)
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