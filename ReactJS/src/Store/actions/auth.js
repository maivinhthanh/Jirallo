import * as actionTypes from '../constants/auth';
import CallApi from '../../until/apiCaller';

export const login = ( data ) => {
    return {
        type: actionTypes.Login,
        token: data.token,
        id: data.userId
    };
};
export const loginfail = ( name ) => {
    return {
        type: actionTypes.LoginFail,
        message: name
    };
};
export const loginAction = (email, password) => {
    return dispatch => {
        return CallApi('auth/login', 'POST',{
            email: email,
            password: password
          }).then( response => {
              console.log(response)
            dispatch(login(response.data));
         } )
         .catch( error => {
             console.log(error)
             dispatch(loginfail());
         } );
        
    };
};