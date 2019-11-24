import * as actionTypes from '../constants/project';
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
    console.log(action.data)
    let cloneState = _.clone(state)
    cloneState = [...action.data]
    return cloneState
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.viewListIssuesInProjectSuccess: return viewListIssuesInProjectSuccess(state, action)
        default: return state;
    }
};

export default reducer;