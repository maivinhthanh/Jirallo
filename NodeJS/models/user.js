const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female',
    Other: 'other',
})


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    oldpassword: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    birthdate: {
        type: Date
    },
    gender: {
        type: String,
        enum: Object.values(Genders),
    },
    idproject:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

Object.assign(userSchema.statics, {
    Genders,
})

module.exports = mongoose.model('User', userSchema)
