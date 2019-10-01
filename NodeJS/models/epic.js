const mongoose = require('mongoose')
const Schema = mongoose.Schema

const epicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    idissues:[
        {
        type: Schema.Types.ObjectId,
        ref: 'issues',
        required: true
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Epic', epicSchema)
