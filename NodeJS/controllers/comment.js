const {ObjectId} = require('mongodb')
const Issues = require('../models/issues')
const Comment = require('../models/comment')
const Activities = require('../models/activities')

exports.createComment = async (req, res, next) => {
    try{
        const idissues = req.params.idissues
        const content = req.body.content
        const assignee = req.body.assignee
        
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        
        const iduser = req.userId
        if(!content){
            res.status(203).json({ message: 'Not found Content' })
            return
        }
        
        const comment = new Comment({
            author: iduser,
            assignee: assignee,
            content: content,
            image: image,
            idissue:idissues,
            dateedit: Date.now(),
        })

        const newcomment = await comment.save()

        await Issues.findByIdAndUpdate(idissues, {
            $push: { 
                comment: ObjectId(newcomment._id)
            }
        },{ new: true })

        const action = new Activities({
            action: 'createComment',
            content: 'comment/createComment',
            iduser: req.userId,
            newdata: comment
        })

        await action.save()

        res.status(201).json({ newcomment})
    }
    catch (error) {
        
        next(error)
    }
    
}
exports.getListComment = async (req, res, next) => {
    try{
        const idissue = req.params.idissue
        
        const listcomment = await Comment.find({idissue: idissue})
        .populate({
            path: 'author',
            match:{
                hidden: false,
            },
            select:['name', 'avatar', 'image']
        }).populate({
            path: 'assignee',
            match:{
                hidden: false,
            },
            select:['name', 'avatar', 'image']
        })

        res.status(200).json({ listcomment })
    }
    catch (error) {
        
        next(error)
    }
    
}