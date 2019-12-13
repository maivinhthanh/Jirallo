const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female'
})


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    idfacebook: {
        type: String,
        unique: true,
    },
    idgoogle: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    oldpassword: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
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
