import _ from 'lodash'
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    idproject: '',
    name: '',
    author: [{
        name:'',
        code:''
    }],
    teacher:'',
    year: '',
    preface: '',
    introduce:{
        urgency:[],
        target:[],
        structure: []
    },
    theory:[{
        title: '',
        content:[],
        image: [],

    }],
    survey:[{
        name: '',
        image: [],
        advantages:[],
        defect:[]
    }],
    usecase:{
        diagram:[{
            image:[],
            title:''
        }],
        descript: [{
            title: '',
            name: '',
            key: '',
            briefdescript: [],
            actor: '',
            precondition:'',
            postcondition: '',
            basicflows: [],
            exception: [],
            nametable: '',
            image:[],
        }]
    },
    descriptionWebsite: [],
    database:{
        image:[]
    },
    ui:[{
        group:"",
        content:[{
            title: "",
            image: [],
            descript: "",
            listobject:[],
            nametable:""
        }]
    }],
    setting:{
        language: [],
        technology:[],
        structure: []
    },
    conclude:{
        result: [],
        advantages: [],
        defect: [],
        development: []
    },
    references: []
};

const updatestate = (state, action) =>{
   return updateObject( state, action.data);
}

const addIntroduce = (state, action) =>{
    const newState = _.cloneDeep(state)
    if(action.data === 'Urgency'){
        newState.introduce.urgency = [...newState.introduce.urgency, '............']
    }
    else if(action.data === 'Target'){
        newState.introduce.target = [...newState.introduce.target, '............']
    }
    else{
        newState.introduce.structure = [...newState.introduce.structure, '............']
    }
    return newState
}
const addParagraghSurvey = (state, action) =>{
    const newState = _.cloneDeep(state)
    if(action.data === 'Advantages'){
        newState.survey[action.key].advantages = [...newState.survey[action.key].advantages, '............']
    }
    else{
        newState.survey[action.key].defect = [...newState.survey[action.key].defect, '............']
    }
    return newState
}

const addSurvey = (state, action) =>{
    const newState = _.cloneDeep(state)
    newState.survey = [...newState.survey, {
        name: '',
        image: [],
        advantages:[],
        defect:[]
    }]
    return newState

}
const addParagraghBrief = (state, action) =>{
    const newState = _.cloneDeep(state)
    newState.usecase.descript[action.key].briefdescript = 
    [...newState.usecase.descript[action.key].briefdescript, '............']
    return newState

}
const addflow = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.usecase.descript[action.index].basicflows = 
    [...newState.usecase.descript[action.index].basicflows, {
        user: "",
        system: []
    }]
    return newState
}
const addException = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.usecase.descript[action.index].exception = 
    [...newState.usecase.descript[action.index].exception, {
        description: "",
        system: []
    }]
    return newState
}
const addParagraghFlow = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.usecase.descript[action.indexUsecase].basicflows[action.indexFlow].system = 
    [...newState.usecase.descript[action.indexUsecase].basicflows[action.indexFlow].system,"........."]
    return newState
}
const addParagraghException = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.usecase.descript[action.indexUsecase].exception[action.indexFlow].system = 
    [...newState.usecase.descript[action.indexUsecase].exception[action.indexFlow].system,"........."]
    return newState
}
const addParagraghDescript = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.descriptionWebsite = 
    [...newState.descriptionWebsite,"........."]
    return newState
}
const addObject = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.ui[action.idgroup].content[action.idui].listobject = 
    [...newState.ui[action.idgroup].content[action.idui].listobject,{
        type: '',
        descript: ''
    }]
    return newState
}
const addSetting = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.setting[action.name] = 
    [...newState.setting[action.name],".........."]
    return newState
}
const addTesting = (state, action)=>{
    const newState = _.cloneDeep(state)
    newState.testing[action.index].content = 
    [...newState.testing[action.index].content,{
        name:'',
        description: '',
        expect: '',
        result: ''
    }]
    return newState
}
const addConclude = (state, action) =>{
    const newState = _.cloneDeep(state)
    if(action.data === 'result'){
        newState.conclude.result = [...newState.conclude.result, '............']
    }
    else if(action.data === 'advantages'){
        newState.conclude.advantages = [...newState.conclude.advantages, '............']
    }
    else if(action.data === 'defect'){
        newState.conclude.defect = [...newState.conclude.defect, '............']
    }
    else{
        newState.conclude.development = [...newState.conclude.development, '............']
    }
    return newState
}
const addTheory = (state, action) =>{
    const newState = _.cloneDeep(state)
    newState.theory[action.index].content = [...newState.theory[action.index].content, '............']
    
    return newState
}
const addReference = (state, action) =>{
    const newState = _.cloneDeep(state)
    newState.references = [...newState.references, '............']
    
    return newState
}
const addreport = (state, action) =>{
    
    return action.data
}
const reportReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_REPORT': return addreport( state, action );
        case 'GET_REPORT_IN_PROJECT': return updatestate( state, action );
        case 'EDIT_COVER': return updatestate( state, action );
        case 'ADD_PARAGRAPH_INTRODUCE': return addIntroduce( state, action );
        case 'ADD_PARAGRAPH_SERVEY': return addParagraghSurvey( state, action );
        case 'ADD_SERVEY': return addSurvey( state, action );
        case 'ADD_PARAGRAPH_BRIEF': return addParagraghBrief( state, action);
        case 'ADD_FLOW': return addflow(state, action );
        case 'ADD_PARAGRAPH_FLOW': return addParagraghFlow( state, action);
        case 'ADD_EXCEPTION': return addException( state, action);
        case 'ADD_PARAGRAPH_EXCEPTION': return addParagraghException( state, action);
        case 'ADD_PARAGRAPH_DESCRIPT_WEBSITE': return addParagraghDescript(state, action);
        case 'ADD_OBJECT': return addObject(state, action);
        case 'ADD_PARAGRAPH_SETTING': return addSetting(state, action);
        case 'ADD_PARAGRAPH_TESTING': return addTesting(state, action);
        case 'ADD_PARAGRAPH_CONCLUDE': return addConclude(state, action);
        case 'ADD_PARAGRAPH_REFERENCE': return addReference(state, action);
        case 'ADD_PARAGRAPH_THEORY': return addTheory(state, action);
        default: return state;
    }
};

export default reportReducer;