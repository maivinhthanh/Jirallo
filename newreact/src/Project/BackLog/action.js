import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const auth = (hasAuth,position) => {
    return {
        type: 'AUTHORIZATION',
        position, hasAuth
    }
}
export const HasAuth = (idproject) => {
    return dispatch =>{
        return CallApi('project/hasAuth/'+ idproject, 'GET',{})
        .then (response =>{
            if(response.status === 200){
                dispatch(auth(response.data.hasAuth, response.data.position));
            }
            else {
                dispatch(Notification.Error(response.data))
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
    }
}