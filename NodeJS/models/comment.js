const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content:{
        type: String,
        required: true
    },
    idissue: {
        type: Schema.Types.ObjectId,
        ref: 'Issues',
    },
    image:[
        {
            type: String
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Comment', commentSchema)
