import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const getlistuserinproject = (data) =>{
    return {
        type:'GET_LIST_USER_IN_PROJECT',
        data: data
    }
}

export const GetListUserInProject = (id) => {
    return dispatch => {
        return CallApi(`project/getListUserInProject/${id}`,
        'GET',
        {},
        ).then (response =>{
                
            if(response.status === 200){
                dispatch(getlistuserinproject(response.data.listuser));
                
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
