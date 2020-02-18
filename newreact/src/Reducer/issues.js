const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    
};

const changeProcessIssue = (state, action) =>{
    return updateArray(state,action.data )
}

const issuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'CHANGE_PROCESS_ISSUE': return changeProcessIssue( state, action ); 
        default: return state;
    }
};

export default issuesReducer;