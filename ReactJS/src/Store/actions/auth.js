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
            // result =  dispatch(login(response));
            // return result
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
            console.log(response.data);
            dispatch(register(response.data))
        }).catch (err =>{
            dispatch(registerFail())
        })
    }
}
export const EditUserAction = (id,user) =>{
    console.log(id,user);
    return dispatch =>{
        return CallApi(`auth/editProfile/${id}`,'PUT',{
            gender : user[0].gender,
            avatar: user[0].avatar,
            name:user[0].name,
            birthdate: user[0].birthday
        },
        document.cookie.split("=")[2]
        ).then(response =>{
            console.log(response)
            if(response.data.result.length !== 0){
                dispatch(EditUser(response.data.result))
            }
        })
        .catch(err =>{
            console.log(err)
           dispatch(EditUserFail(err))
        })
    }
}