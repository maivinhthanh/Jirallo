import * as actionTypes from '../constants/auth';
import { updateObject } from '../utility';

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
    document.cookie = 'token='+token
    console.log(token)
    return updateObject( state, {id : action.id} );
};

const loginfail = (state, action) => {
    return updateObject( state, { error: true } );
};

const register = (state, action) =>{
   return updateObject( state, {id : action.id} );
}

const registerFail = (state,action) =>{
    return updateObject(state,{error : true})
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Login: return login( state, action ); 
        case actionTypes.LoginFail: return loginfail(state, action);
        case actionTypes.Register : return register(state,action);
        case actionTypes.RegisterFail : return registerFail(state,action);
        default: return state;
    }
};

export default reducer;