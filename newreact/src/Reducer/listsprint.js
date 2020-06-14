import _ from 'lodash';

const updateArray = (oldObject, updatedProperties) => {
    return [...oldObject, ...updatedProperties]
};

const initialState = [{
    _id: null,
    idissues: [],
    hidden: false,
    name: 'Backlog',
    listissues: []
    
}];

const showListSprint = (state, action) =>{
    let cloneState = _.cloneDeep(state)
    return updateArray( [cloneState[0]], action.data);
}
const viewListIssue = (state, action) =>{
    let cloneState = _.cloneDeep(state)
    const index = cloneState.findIndex(i=>i._id === action.idsprint)
    cloneState[index].listissues = action.data
    return cloneState
}
const showListIssueInBackLog = (state, action) =>{
    let cloneState = _.cloneDeep(state)
    cloneState[0].listissues = action.data
    return cloneState
}
const createNameSprint = (state, action) => {
    let cloneState = _.cloneDeep(state)
    cloneState.push(action.data)
    return cloneState
}
const updateName = (state, action) => {
    let cloneState = _.cloneDeep(state)
    _.map(cloneState, (item, key) => {
        if (item._id === action.data.id) {
            item.name = action.data.name
        }
    })
    return cloneState
}
const createIssueBacklog = (state, action) => {
    let cloneState = _.clone(state)
    _.map(cloneState, (item) => {
        if (item._id !== null) {
            item.listissues.push(action.data.newissues)
        }
    })
    return cloneState

}
const deleteSprint = (state, action) => {
    let cloneState = _.cloneDeep(state)
    return cloneState
}
const listsprint = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'SHOW_LIST_SPRINT': return showListSprint( state, action ); 
        case 'VIEW_LIST_ISSUES_IN_SPRINT': return viewListIssue(state, action);
        case 'SHOW_LIST_ISSUES_IN_BACKLOG': return showListIssueInBackLog( state, action ); 
        case 'ADD_NAME_SPRINT' : return createNameSprint(state, action);
        case 'UPDATE_NAME' : return updateName(state, action);
        case 'CREATE_ISSUE_BACKLOG': return createIssueBacklog(state,action);
        case 'DELETE_SPRINT': return deleteSprint(state, action)

        default: return state;
    }
};

export default listsprint;