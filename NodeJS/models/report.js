const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    idproject: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    name: {
        type: String,
        required: true
    },
    author: [{
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
    }],
    teacher:{
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    preface: {
        type: String,
        default: ""
    },
    introduce:{
        urgency: [
            {
                type: Array,
                default: ""
            }
        ],
        target: [
            {
                type: String,
                default: ""
            }
        ],
        structure: [
            {
                type: String,
                default: ""
            }
        ]
    },
    survey:[
        {
            name:{
                type: String,
                default: ""
            },
            content:[{
                type: String,
                default: ""
            }]
        }
    ],
    criteria:{
        advantages: {
            type: String,
            default: ""
        },
        defect: {
            type: String,
            default: ""
        }
    },
    usecase:{
        general:[{
            image:{
                type: String,
                default: ""
            },
            title:{
                type: String,
                default: ""
            },
        }],
        actor:[{
                name:{
                    type: String,
                    default: ""
                },
                major: [
                    {
                        name:{
                            type: String,
                            default: ""
                        },
                        type:{
                            type: String,
                            default: ""
                        },
                        regulations:{
                            type: String,
                            default: ""
                        },
                        image:{
                            type: String,
                            default: ""
                        },
                        key:{
                            type: String,
                            default: ""
                        },
                    }
                ]
            }
            
        ]

    },
    database:{
        usecase:[{
            name:{
                type: String,
                default: ""
            },
            table:{
                type: String,
                default: ""
            },
            actor:{
                type: String,
                default: ""
            },
            stream: {
                D1: {
                    type: String,
                    default: ""
                },
                D2: {
                    type: String,
                    default: ""
                },
                D3: {
                    type: String,
                    default: ""
                },
                D4: {
                    type: String,
                    default: ""
                },
                D5: {
                    type: String,
                    default: ""
                },
                D6: {
                    type: String,
                    default: ""
                },
            },
            algorithm: {
                type: String,
                default: ""
            }
        }],
        table: [{
            name:  {
                type: String,
                default: ""
            },
            row: [{
                name:  {
                    type: String,
                    default: ""
                },
                type:  {
                    type: String,
                    default: ""
                }
            }]
        }]
    },
   
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Report', reportSchema)
