const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitiesSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    iduser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content:{
        type: String,
    },
    olddata:{
        type: Schema.Types.Mixed,
    },
    newdata:{
        type: Schema.Types.Mixed,
    },
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Activities', activitiesSchema)
