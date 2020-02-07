const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Type = Object.freeze({
    Public: 'public',
    Private: 'private',
})

const groupSchema = new Schema({
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
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    idUser:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    idproject:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        }
    ],
    
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

Object.assign(groupSchema.statics, {
    Type
})

module.exports = mongoose.model('Group', groupSchema)
