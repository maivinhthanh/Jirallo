import _ from 'lodash';
import { addNameSprint } from './BackLog/Backlog/action';

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
    _id: null,
    idissues: [],
    hidden: false,
    name: 'Backlog',
    listissues: []
    
}];

const showListSprint = (state, action) =>{
   return updateArray( state, action.data);
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
    console.log(action.data)
    cloneState.push(action.data)
    console.log('test',cloneState)
    return cloneState
}
const listsprint = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'SHOW_LIST_SPRINT': return showListSprint( state, action ); 
        case 'VIEW_LIST_ISSUES_IN_SPRINT': return viewListIssue(state, action);
        case 'SHOW_LIST_ISSUES_IN_BACKLOG': return showListIssueInBackLog( state, action ); 
        case 'ADD_NAME_SPRINT' : return createNameSprint(state, action);
        default: return state;
    }
};

export default listsprint;