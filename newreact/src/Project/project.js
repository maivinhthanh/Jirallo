const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    type: '',
    idepic: [],
    idgroup: [],
    idsprint: [],
    idissues: [],
    process: [],
    _id: '',
    idmembers: [],
    name: '',
    activesprint: '',
    description: '',
    image: ''
};

const updatestate = (state, action) =>{
   return updateObject( state, action.data);
}

const projectReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_INFO_PROJECT': return updatestate( state, action ); 
        
        default: return state;
    }
};

export default projectReducer;