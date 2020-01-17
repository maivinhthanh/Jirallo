import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const changePass = (token, password) =>{
    return dispatch =>{
        return CallApi(`auth/changePass`,'POST',
        {
            token: token,
            password: password
        },
        'token'
        ).then(response =>{
            dispatch(Notification.CreateSuccess({message: 'Check gmail'}))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}