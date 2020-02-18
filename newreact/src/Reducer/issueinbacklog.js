import _ from 'lodash'

const updateArray = (oldObject, updatedProperties) => {
    return [...oldObject, ...updatedProperties]
};

const initialState = []

const showListIssueInBackLog = (state, action) =>{
    return updateArray( state, action.data);
}

const issueinbacklog = ( state = initialState, action ) => {
    switch ( action.type ) {
        // case 'SHOW_LIST_ISSUES_IN_BACKLOG': return showListIssueInBackLog( state, action ); 
        default: return state;
    }
};

export default issueinbacklog;