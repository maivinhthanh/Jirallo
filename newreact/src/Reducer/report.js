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
        urgency:'',
        target:'',
        structure: ''
    },
    survey:[],
    criteria:{
        advantages:'',
        defect:''
    },
    usecase:{
        general:[{
            image:'',
            title:''
        }],
        actor: [{
            name: '',
            major:[{
                name:'',
                type:'',
                regulations:'',
                image:'',
                key:'',
            }]
        }]
    },
    database:{
        usecase:[{
            name:'',
            table:'',
            actor:'',
            stream:{
                D1:'',
                D2:'',
                D3:'',
                D4:'',
                D5:'',
                D6:'',
            },
            algorithm:'',
        }],
        table:[{
            name:'',
            type:'',
        }]
    }
};

const updatestate = (state, action) =>{
   return updateObject( state, action.data);
}

const reportReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_REPORT_IN_PROJECT': return updatestate( state, action );
        case 'EDIT_COVER': return updatestate( state, action );
        default: return state;
    }
};

export default reportReducer;