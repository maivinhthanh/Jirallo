const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    
};

const updatestate = (state, action) =>{
   return updateObject( state, {id : action.id, error:false},);
}

const issuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ACTION': return updatestate( state, action ); 
        
        default: return state;
    }
};

export default issuesReducer;