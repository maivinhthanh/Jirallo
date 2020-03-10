import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';
import Cookies from 'js-cookie'

export const login = ( data ) => {
    return {
        type: 'Login',
        token: data.token,
        refreshtoken: data.refreshToken,
        id: data.userId,
    };
};

export const loginAction = (email, password) => {
    Cookies.remove('token')
    Cookies.remove('refreshtoken')
    return dispatch => {
        return CallApi('auth/login', 'POST',{
                email: email,
                password: password
            })
            .then( response => {
                if(response.status === 200){
                    dispatch(login(response.data));
                }
                else {
                    dispatch(Notification.Error(response.data));
                    setTimeout(() => {
                        dispatch(Notification.hideNotification())
                    }, 5000)
                }
            })
            .catch(error =>{
                dispatch(Notification.ErrorAPI(error));
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            })
    };
};
export const loginByFacebookAction = (data) => {
    
    return dispatch => {
        return CallApi('auth/loginbyfacebook', 'POST',{
            idfacebook: data.id,
            // image: data.picture.data.url,
            email: data.email,
            name: data.name
        })
        .then( response => {
            if(response.status === 200){
                dispatch(login(response.data));
            }
            else {
                dispatch(Notification.Error(response.data));
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
         .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    };
};
export const loginByGoogleAction = (data) => {
    return dispatch => {
        return CallApi('auth/loginbygoogle', 'POST',{
            idgoogle: data.googleId,
            image: data.imageUrl,
            email: data.email,
            name: data.name
        })
        .then( response => {
            if(response.status === 200){
                dispatch(login(response.data));
            }
            else {
                dispatch(Notification.Error(response.data));
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    };
};
