const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    
};

const changeProcessIssue = (state, action) =>{
    return updateObject(state,action.data )
}
const selectIssuesInFilter = (state, action) =>{
    return updateObject(state,action.data )
}
const issuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'CHANGE_PROCESS_ISSUE': return changeProcessIssue( state, action ); 
        case 'SELECT_ISSUES_IN_FILTER': return selectIssuesInFilter( state, action ); 
        
        default: return state;
    }
};

export default issuesReducer;