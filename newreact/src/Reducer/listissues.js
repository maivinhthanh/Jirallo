import _ from 'lodash'

const updateArray = (oldObject, updatedProperties) => {
    return [...oldObject, ...updatedProperties]
};

const initialState = []

const getIssuesInSprintActive = (state, action) =>{
   return updateArray(state,action.data )
}
const changeProcessIssueInListIssues = (state, action) =>{
    const index = _.findIndex(state, (item,index)=>item._id === action.data._id)
    let clone = _.clone(state)
    clone[index] = action.data
    return clone
}
const filterIssues = (state, action) =>{

    return action.data
}
const listIssuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_ISSUES_IN_SPRINT_ACTIVE': return getIssuesInSprintActive( state, action ); 
        case 'CHANGE_PROCESS_ISSUE': return changeProcessIssueInListIssues( state, action ); 
        case 'FILTER_ISSUES': return filterIssues( state, action ); 

        default: return state;
    }
};

export default listIssuesReducer;