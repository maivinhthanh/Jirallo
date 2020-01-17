import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const sendEmail = (email) =>{
    return dispatch =>{
        return CallApi(`auth/sendMail`,'POST',
        {email: email},
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