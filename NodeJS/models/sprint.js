const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sprintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timebegin: {
        type: Date
    },
    deadline: {
        type: Date
    },
    timeend: {
        type: Date
    },
    report:{
        type: Schema.Types.Mixed,
    },
    idissues:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Issues',
            required: true
        }
    ],
    isfinish:{ type: Boolean, default: false },
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Sprint', sprintSchema)
