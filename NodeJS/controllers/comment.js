const {ObjectId} = require('mongodb')
const Issues = require('../models/issues')
const Comment = require('../models/comment')
const Activities = require('../models/activities')

exports.createComment = async (req, res, next) => {
    try{
        console.log("!")
        const idissues = req.params.idissues
        const content = req.body.content
        const assignee = req.body.assignee
        
        let image = null
        if (req.file !== undefined) {
            image = req.file.path
        }
        
        const iduser = req.userId
        console.log(idissues, content, assignee)
        if(!content){
            res.status(203).json({ message: 'Not found Content' })
            return
        }
        
        const comment = new Comment({
            author: iduser,
            assignee: assignee,
            content: content,
            image: image,
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