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
export const register = (data) =>{
    return {
        type:actionTypes.Register,
        id: data.userId
    }
}
export const registerFail = (name) =>{
    return {
        type: actionTypes.RegisterFail,
        message: name
    }
}
export const loginAction = (email, password) => {
    return dispatch => {
        return CallApi('auth/login', 'POST',{
            email: email,
            password: password
          }).then( response => {
            dispatch(login(response.data));
         } )
         .catch(error => {
             dispatch(loginfail());
         } );
    };
};
export const RegisterAction = (email,password,fullname) =>{
    return dispatch =>{
        return CallApi('auth/signup','PUT',{
            email:email,
            password:password,
            name: fullname
        }).then (response =>{
            console.log(response.data)
            dispatch(register(response.data))
        }).catch (err =>{
            dispatch(registerFail())
        })
    }
}