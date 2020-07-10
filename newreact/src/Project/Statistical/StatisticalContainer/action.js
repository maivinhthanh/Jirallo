import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const getinfoproject = (data) =>{
    return {
        type:'GET_INFO_PROJECT_CHART',
        data: data
    }
}

export const GetInfoProject = (id) =>{
    return dispatch =>{
        return CallApi(`project/calProgressProject/${id}`,'GET',
        {}
        ).then (response =>{
            
            if(response.status === 200){
                dispatch(getinfoproject(response.data));
                
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
