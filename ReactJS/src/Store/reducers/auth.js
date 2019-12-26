import * as actionTypes from '../constants/auth';
import { updateObject } from '../utility';
import Cookies from 'js-cookie'
import CallApi from '../../until/apiCaller';

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
    const refreshtoken = action.refreshtoken
    Cookies.set('token', token, { expires: 365 });
    Cookies.set('refreshtoken', refreshtoken, { expires: 365 });
    let json = {
        code : 'ok',
        data : action.id
    }
    state = json
    CallApi('auth/getMyInfo', 'GET',{},'token')
    .then( response => {
        localStorage.setItem('user', JSON.stringify(response.data.result));
        console.log(response.data.result)
     } )
     .catch(error => {
        
     } );
    return updateObject( state, {id : action.id} );
};

const loginfail = (state, action) => {
    return updateObject( state, { error: true } );
};

const register = (state, action) =>{
   return updateObject( state, {id : action.id, error:false},);
}

const registerFail = (state,action) =>{
    console.log(state, action)
    return updateObject(state,{error : true})
}
const EditUserSuccess = (state, action) =>{
    return updateObject(state, {result : action.result})
}
const EditUserFail = (state, action) =>{
    return updateObject(state,{error : true})
}
const LogOut = (state, action) =>{
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
        case actionTypes.LogOut : return LogOut(state,action)

        default: return state;
    }
};

export default reducer;