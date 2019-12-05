const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    refreshtoken: {
        type: String,
        required: true
    },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Token', tokenSchema)
