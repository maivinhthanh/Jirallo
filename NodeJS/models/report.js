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
    theory:[{
        title:{
            type: String,
            default: ""
        },
        content:[{
                type: String,
                default: ""
        }],
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
    }],
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
        descript:[
            {
                title:{
                    type: String,
                    default: ""
                },
                name:{
                    type: String,
                    default: ""
                },
                key:{
                    type: String,
                    default: ""
                },
                briefdescript:[{
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
                postcondition:{
                    type: String,
                    default: ""
                },
                basicflows:[{
                    user:{
                        type: String,
                        default: ""
                    },
                    system:[{
                        type: String,
                        default: ""
                    }]
                    
                }],
                exception:[{
                    description:{
                        type: String,
                        default: ""
                    },
                    system:[{
                        type: String,
                        default: ""
                    }]
                    
                }],
                nametable:{
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
                }]
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
    ui:[
        {
            group:{
                type: String,
                default: ""
            },
            content:[
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
                    descript:{
                        type: String,
                        default: ""
                    },
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
            ]
        }
        
    ],
    setting: {
        language:[{
            type: String,
            default: ""
        }],
        technology:[{
            type: String,
            default: ""
        }],
        structure:[{
            type: String,
            default: ""
        }],
    },
    testing: [{
        title: {
            type: String,
            default: ""
        },
        content: [{
            name:{
                type: String,
                default: ""
            },
            description:{
                type: String,
                default: ""
            },
            expect:{
                type: String,
                default: ""
            },
            result:{
                type: String,
                default: ""
            }
        }]
    }],
    conclude:{
        result: [
            {
                type: Array,
                default: ""
            }
        ],
        advantages: [
            {
                type: String,
                default: ""
            }
        ],
        defect: [
            {
                type: String,
                default: ""
            }
        ],
        development: [
            {
                type: String,
                default: ""
            }
        ]
    },
    references: [
        {
            type: String,
            default: ""
        }
    ],
    hidden:{ type: Boolean, default: false },
    datecreate: { type: Date, default: Date.now },
    dateedit: { type: Date }
})

module.exports = mongoose.model('Report', reportSchema)
