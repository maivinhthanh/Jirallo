import * as actionTypes from '../constants/auth';
import CallApi from '../../until/apiCaller';

export const login = ( account ) => {
    
    return {
        type: actionTypes.Login,
        token: account.data.token,
        id: account.data.userId,
        status : account.status
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
export const EditUser = (user) =>{
    return {
        type: actionTypes.EditUserSuccess,
        data: user
    }
}
export const EditUserFail = (name) =>{
    return {
        type: actionTypes.EditUserFail,
        message: name
    }
}
export const loginAction = (email, password) => {
    
    return dispatch => {
        return CallApi('auth/login', 'POST',{
            email: email,
            password: password
          }).then( response => {
            
            dispatch(login(response));
         } )
         .catch(error => {
             dispatch(loginfail(error));
         } );
    };
};
export const loginByFacebookAction = (data) => {
    
    return dispatch => {
        return CallApi('auth/loginbyfacebook', 'POST',{
            idfacebook: data.id,
            image: data.picture.data.url,
            email: data.email,
            name: data.name
          }).then( response => {
            dispatch(login(response));
         } )
         .catch(error => {
             dispatch(loginfail(error));
         } );
    };
};
export const loginByGoogleAction = (data) => {
    
    return dispatch => {
        return CallApi('auth/loginbygoogle', 'POST',{
            idgoogle: data.googleId,
            image: data.imageUrl,
            email: data.email,
            name: data.name
          }).then( response => {
            dispatch(login(response));
         } )
         .catch(error => {
             dispatch(loginfail(error));
         } );
    };
};
export const RegisterAction = (email,password,fullname,avatar,gender) =>{
    return dispatch =>{
        return CallApi('auth/signup','PUT',{
            email:email,
            password:password,
            name: fullname,
            image:avatar,
            gender:gender
        }).then (response =>{
            dispatch(register(response.data))
        }).catch (err =>{
            dispatch(registerFail())
        })
    }
}
export const EditUserAction = (id,user) =>{
    return dispatch =>{
        return CallApi(`auth/editProfile/${id}`,'PUT',
        user,
        'token'
        ).then(response =>{
            if(response.data.result.length !== 0){
                dispatch(EditUser(response.data.result))
            }
        })
        .catch(err =>{
           dispatch(EditUserFail(err))
        })
    }
}