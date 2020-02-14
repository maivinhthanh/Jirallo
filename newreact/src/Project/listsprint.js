import _ from 'lodash';

const updateArray = (oldObject, updatedProperties) => {
    return [...oldObject, ...updatedProperties]
};
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
const initialState = [{
    idsprint: null,
    idissues: [],
    hidden: false,
    name: 'Backlog',
    listissues: []
    
}];

const showListSprint = (state, action) =>{
   return updateArray( state, action.data);
}
const viewListIssue = (state, action) =>{
    // console.log(action.data)
}
const showListIssueInBackLog = (state, action) =>{
    let cloneState = _.cloneDeep(state)
    cloneState[0].listissues = action.data
    return cloneState
}
const listsprint = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'SHOW_LIST_SPRINT': return showListSprint( state, action ); 
        case 'VIEW_LIST_ISSUES_IN_SPRINT': return viewListIssue(state, action);
        case 'SHOW_LIST_ISSUES_IN_BACKLOG': return showListIssueInBackLog( state, action ); 
        default: return state;
    }
};

export default listsprint;