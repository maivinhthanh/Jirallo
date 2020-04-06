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
            image:[{
                name:{
                    type: String,
                    default: ""
                },
                address:{
                    type: String,
                    default: ""
                }
            }],
            advantages:[{
                type: String,
                default: ""
            }],
            defect:[{
                type: String,
                default: ""
            }]
        }
    ],
    usecase:{
        diagram:[{
            image:[{
                name:{
                    type: String,
                    default: ""
                },
                address:{
                    type: String,
                    default: ""
                }
            }],
            title:{
                type: String,
                default: ""
            },
        }],
        descript:[{
                title:{
                    type: String,
                    default: ""
                },
                descript: [
                    {
                        title:{
                            type: String,
                            default: ""
                        },
                        descript:[{
                            type: String,
                            default: ""
                        }],
                        actor:{
                            type: String,
                            default: ""
                        },
                        precondition:{
                            type: String,
                            default: ""
                        },
                        step:[{
                            type: String,
                            default: ""
                        }],
                        nametable:{
                            type: String,
                            default: ""
                        },
                        image:{
                            name:{
                                type: String,
                                default: ""
                            },
                            address:{
                                type: String,
                                default: ""
                            }
                        }
                    }
                ]
            }
            
        ]

    },
    descriptionWebsite: [{
        type: String,
        default: ""
    }],
    database:{
        image:[{
            name:{
                type: String,
                default: ""
            },
            address:{
                type: String,
                default: ""
            }
        }]
    },
    UI:[
        {
            title:{
                type: String,
                default: ""
            },
            image:[{
                name:{
                    type: String,
                    default: ""
                },
                address:{
                    type: String,
                    default: ""
                }
            }],
            descript:[{
                type: String,
                default: ""
            }],
            listobject:[
                {
                    type:{
                        type: String,
                        default: ""
                    },
                    descript:{
                        type: String,
                        default: ""
                    }
                }
            ],
            nametable:{
                type: String,
                default: ""
            }
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Report', reportSchema)
