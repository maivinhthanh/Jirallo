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
