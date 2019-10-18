import * as actionTypes from '../constants/sprint';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = {
   _id: '',
   idissues: [],
   hidden: false,
   name: '',
   datecreate: '',
   error: false,
};
export const createSprint =(state, action) => {
  console.log(action.data)
  // let cloneState = [...state]
  // cloneState.push(action.data.newsprint)
  // console.log(cloneState)
  // return cloneState
  return updateObject(state, action.data.newsprint)
}
export const errorSprint =(state, action) => {
  return updateObject(state, {error: true})
}
// export const showListIssue = (state, action) => {
//   console.log(action.data)
//   let cloneState = _.clone(state)
//   cloneState = [...action.data.listissues]
//   return cloneState
// }
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.createSprint: return createSprint( state, action );
        case actionTypes.errorSprint : return errorSprint(state, action);
        default: return state;
    }
};

export default reducer ;