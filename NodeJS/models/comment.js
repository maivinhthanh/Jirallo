const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Comment', commentSchema)
