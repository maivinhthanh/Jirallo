const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Type = Object.freeze({
    Bug: 'bug',
    Task: 'task',
})
const Process = Object.freeze({
    Todo: 'todo',
    InProgress: 'inprogress',
    Review: 'review',
    Done: 'done',
})
const Priority = Object.freeze({
    Highest: 'highest',
    High: 'high',
    Medium: 'medium',
    Low: 'low',
    Lowest: 'lowest',
})

const issuesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    repoter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    process:{
        type: String,
        // enum: Object.values(Process),
    },
    type:{
        type: String,
        enum: Object.values(Type),
    },
    priority:{
        type: String,
        enum: Object.values(Priority),
    },
    tag:{
        type: String,
    },
    descript:{
        type: String,
    },
    idepic:{
        type: Schema.Types.ObjectId,
        ref: 'Epic',
    },
    idsprint:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Sprint',
            required: true
        }
    ],
    idproject:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    image:[
        {
            type: String
        }
    ],
    comment:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    watch:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

Object.assign(issuesSchema.statics, {
    Process,Type, Priority
})
  
module.exports = mongoose.model('Issues', issuesSchema)
