import * as actionTypes from '../constants/auth';
import { updateObject } from '../utility';
import Cookies from 'js-cookie'
import CallApi from '../../until/apiCaller';
import { EditUser } from '../actions/auth';

const initialState = {
    id: '',
    email: '',
    password: '',
    gender: '',
    name: '',
    image: '',
    birthdate:  '',
    idgroup: [],
    error: false,
    message: ''
};

const login = ( state, action ) => {
    const token = action.token
    Cookies.set('token', token, { expires: 7 });
    let json = {
        code : 'ok',
        data : action.id
    }
    state = json
    console.log(token)
    CallApi('auth/getMyInfo', 'GET',{})
    .then( response => {
        localStorage.setItem('user', JSON.stringify(response.data.result));
        
     } )
     .catch(error => {
        
     } );
    return updateObject( state, {id : action.id} );
};

const loginfail = (state, action) => {
    return updateObject( state, { error: true } );
};

const register = (state, action) =>{
   return updateObject( state, {id : action.id},  );
}

const registerFail = (state,action) =>{
    return updateObject(state,{error : true})
}
const EditUserSuccess = (state, action) =>{
    return updateObject(state, {result : action.result})
}
const EditUserFail = (state, action) =>{
    return updateObject(state,{error : true})
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Login: return login( state, action ); 
        case actionTypes.LoginFail: return loginfail(state, action);
        case actionTypes.Register : return register(state,action);
        case actionTypes.RegisterFail : return registerFail(state,action);
        case actionTypes.EditUserSuccess : return EditUserSuccess(state, action);
        case actionTypes.EditUserFail : return EditUserFail(state,action)
        default: return state;
    }
};

export default reducer;