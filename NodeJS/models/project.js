const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    idmembers:[
        {
            type: Schema.Types.Mixed,
            ref: 'User',
            required: true
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
    activesprint: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
        required: true
    },
    idissues:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Issues',
            required: true
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Project', projectSchema)
