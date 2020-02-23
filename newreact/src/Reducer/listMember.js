const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = []

const getListUserInProject = (state, action) =>{
    action.data.map((item, index) =>{
        state = [...state, item.id]
    })
   return state
}

const listUserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_LIST_USER_IN_PROJECT': return getListUserInProject( state, action ); 
        
        default: return state;
    }
};

export default listUserReducer;