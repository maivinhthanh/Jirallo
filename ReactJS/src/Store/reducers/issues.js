import * as actionTypes from '../constants/issues';
import { updateObject } from '../utility';
import _ from 'lodash';
import { ListIssueInBackLog } from '../actions/issues';
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
  console.log('asd',cloneState)
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
export const assignTaskIssue = (state, action) => {
//   idIssue: "5da02372ededd5282a064f0b"
// respone: {assignee: "5d786cc1827c2b4801038a40"}
  // console.log(state, action.data[0].idIssue)
  // const data = _.filter(state, (item, key) => item._id === action.data[0].idIssue)
  // console.log(data)
  // const filter =  _.map(data, (item, key) => {
  //   console.log(action.data[0].respone.assignee)
  //   item.assignee = action.data[0].respone.assignee
  // })
  // console.log(filter)
  let cloneState = _.cloneDeep(state)
   _.map(cloneState, (data, key) => {
    if(data._id == action.data[0].idIssue){
      data.assignee = action.data[0].respone.assignee
      console.log(cloneState)
    }
  })
  return cloneState
 
  // return cloneState 
}
export const showListIssueInBackLog = (state, action) => {
  console.log(state, action.data.listissues)
  let cloneState = _.cloneDeep(state)
  cloneState = _.cloneDeep(action.data.listissues)
  console.log(cloneState)
  return cloneState
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
        case actionTypes.assignTaskIssue : return assignTaskIssue(state, action);
        case actionTypes.showListIssueInBackLog : return showListIssueInBackLog(state, action);

        default: return state;
    }
};

export default reducer ;