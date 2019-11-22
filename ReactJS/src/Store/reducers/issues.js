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
  let cloneState = [...state]
  cloneState.push(action.data.newissues)
  return cloneState
  // return updateObject(state, action.data.newissues)
}
export const IssueError =(state, action) => {
  return updateObject(state, {error: true})
}
export const showListIssue = (state, action) => {
  let cloneState = _.clone(state)
  cloneState = [...action.data.listissues]
  return cloneState
}
export const EditIssue = (state, action) => {
  return _.map(_.cloneDeep(_.compact(state)), data => {
    if(data._id === action.data.id) {
      return {...data, ...action.data}
    }
    return data
  })
}
export const removeIssueSucces = (state, action) => {
  let cloneState = _.cloneDeep(state);
  _.map(_.compact(cloneState), (item, index) => {
    if(item._id == action.data){
        cloneState.splice(index, 1)
    }
  })
  return cloneState
}
export const AddIssueSuccess = (state, action) => {
  console.log(state, action)
}
export const changeProcessSuccess = (state, action) => {
  return state
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.createIssue: return createIssue( state, action );
        case actionTypes.IssueError : return IssueError(state, action);
        case actionTypes.showListIssue: return showListIssue(state,action);
        case actionTypes.EditIssue: return EditIssue(state, action)
        case actionTypes.removeIssueSucces : return removeIssueSucces(state, action);
        case actionTypes.AddIssueSuccess : return AddIssueSuccess(state, action);
        case actionTypes.changeProcessSuccess: return changeProcessSuccess(state, action);
        default: return state;
    }
};

export default reducer ;