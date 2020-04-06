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
            descript:[{
                title:'',
                descript:[],
                actor:'',
                precondition:'',
                step:'',
                nametable: '',
                image:[],
                
            }]
        }]
    },
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
 
const reportReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_REPORT_IN_PROJECT': return updatestate( state, action );
        case 'EDIT_COVER': return updatestate( state, action );
        case 'ADD_PARAGRAPH_INTRODUCE': return addIntroduce( state, action );
        case 'ADD_PARAGRAPH_SERVEY': return addParagraghSurvey( state, action );
        case 'ADD_SERVEY': return addSurvey( state, action );

        default: return state;
    }
};

export default reportReducer;