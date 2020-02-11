import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const listproject = (data) =>{
    return {
        type:'GETALLLISTPROJECT',
        data: data
    }
}

export const ViewListProject = (data) =>{
    return dispatch =>{
        return CallApi('project/ViewListProject','GET',{
        }).then (response =>{
            
            if(response.status === 200){
                dispatch(listproject(response.data.listproject));
                
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