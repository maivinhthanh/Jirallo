import { getissuesinsprintactive } from "./ActiveSprint/ActiveSprint/action";

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = []

const getIssuesInSprintActive = (state, action) =>{
   return updateObject( state, action.data);
}

const listIssuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_ISSUES_IN_SPRINT_ACTIVE': return getIssuesInSprintActive( state, action ); 
        
        default: return state;
    }
};

export default listIssuesReducer;