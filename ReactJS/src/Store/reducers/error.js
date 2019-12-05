import * as actionTypes from '../constants/error';
import {updateObject, updateArray} from '../utility';
import _ from 'lodash'
const initialState = {
    message:""
}

const errorToken = (state, action) => {
    return updateObject(state, action);
}
const reducer = (state = initialState, action ) =>{
  switch ( action.type ) {
    case actionTypes.errorToken: return errorToken( state, action );
    default: return state;
}
}
export default reducer;