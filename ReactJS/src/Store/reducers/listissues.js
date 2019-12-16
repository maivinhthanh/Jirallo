import * as actionTypesProject from '../constants/project';
import * as actionTypesIssues from '../constants/issues';
import { updateObject } from '../utility';
import _ from 'lodash';

const initialState = [{
    assignee: "",
    name: "",
    priority: "",
    process: "",
    tag: "",
    type: "",
    _id: ""
}];
const viewListIssuesInProjectSuccess = (state, action) => {
    let cloneState = _.clone(state)
    cloneState = [...action.data]
    return cloneState
}
export const changeProcessSuccess = (state, action) => {
    console.log(state, action.data)
    const index = _.findIndex(state, (item,index)=>item._id === action.data._id)
    console.log(index)
    let clone = _.clone(state)
    clone[index] = action.data
    console.log(clone)
    return clone
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypesProject.viewListIssuesInProjectSuccess: return viewListIssuesInProjectSuccess(state, action)
        case actionTypesIssues.changeProcessSuccess: return changeProcessSuccess(state, action);
        default: return state;
    }
};

export default reducer;