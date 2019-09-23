import * as actionTypes from '../constants/user';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = {
    id: '',
    name: '',
    email: '',
    password: '',
    oldpassword:'',
    image:'',
    birthdate:'',
    gender:'',
    idgroup:'',
    error: false,
    message: ''
};
const AddUserSuccess = ( state, action ) => {
  return updateObject(state,action.data)
};

const ErrorUser = (state, action) => {
  return updateObject(state, {error: true });
} 

const reducerUser = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.AddUserSuccess: return AddUserSuccess( state, action );
      case actionTypes.ErrorUser : return ErrorUser(state, action);
      default: return state;
  }
};

export default reducerUser ;
