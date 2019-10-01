import * as actionTypes from '../constants/admin';
import { updateObject,findUserLikeEmail } from '../utility';
import _ from 'lodash';
const initialState = {
    id: '',
    name: '',
    email: '',
    password: '',
    image:'',
    datecreate:'',
    // idgroup:'',
    error: false,
    message: ''
};

const getSearchUser = ( state, action ) => {
    console.log(action)
    return findUserLikeEmail(state,action.data)
};

const getError = (state, action) => {
    return updateObject(state, {error: true });
} 

const reducerAdmin = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SearchSuccess: return getSearchUser( state, action );
        case actionTypes.SearchError : return getError(state, action);
        default: return state;
    }
};

export default reducerAdmin ;