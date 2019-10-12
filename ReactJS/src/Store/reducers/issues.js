import * as actionTypes from '../constants/issues';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = {
    comment: [],
    name: '',
    email: '',
    password: '',
    image:'',
    priority:'',
    process:'',
    datecreate:'',
    repoter:'',
    // idgroup:'',
    error: false,
    hidden: false,
    type:'',
    idissues:''
};
export const createIssue =(state, action) => {
  console.log(action.data)
  let cloneState = [...state]
  cloneState.push(action.data.newissues)
  return cloneState
  // return updateObject(state, action.data.newissues)
}
export const IssueError =(state, action) => {
  return updateObject(state, {error: true})
}
export const showListIssue = (state, action) => {
  console.log(action.data)
  let cloneState = _.clone(state)
  cloneState = [...action.data.listissues]
  return cloneState
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.createIssue: return createIssue( state, action );
        case actionTypes.IssueError : return IssueError(state, action);
        case actionTypes.showListIssue: return showListIssue(state,action);
        default: return state;
    }
};

export default reducer ;