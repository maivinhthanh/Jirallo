const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Type = Object.freeze({
    Public: 'public',
    Private: 'private',
})

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
    },
    type:{
        type: String,
        enum: Object.values(Type),
        default: 'public'
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    idmembers:[
        {
            id:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            position: {
                type: String
            }
            
        }
    ],
    idepic:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Epic',
            required: true
        }
    ],
    idsprint:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Sprint',
            required: true
        }
    ],
    idgroup:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Group',
        }
    ],
    idreport: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
    activesprint: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
    },
    idissues:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Issues',
            required: true
        }
    ],
    process:[
        {
            type: String,
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

Object.assign(projectSchema.statics, {
    Type
})

module.exports = mongoose.model('Project', projectSchema)
