import * as actionTypes from '../constants/group';
import { updateObject } from '../utility';

const initialState = {
    id: '',
    name: '',
    manager: '',
    members: [],
    error: false,
    message: ''
};

const getGroup = ( state, action ) => {
  console.log(action)
  return updateObject( state, {id : action.id} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.getGroup: return getGroup( state, action ); 
        default: return state;
    }
};

export default reducer;