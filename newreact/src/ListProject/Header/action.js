import CallApi from '../../until/apiCaller'
import * as Notification from '../../until/Notification'

export const searchSuccess = (data) => {
    return {
        type: 'searchSuccess',
        data
    }
}
export const listproject = (data) =>{
    return {
        type:'GETALLLISTPROJECT',
        data: data
    }
}

export const handleSearch = (id) => {
    return dispatch => {
        return CallApi(`project/FindProjectByID/${id}`, 'GET')
        .then(respone => {
            if (respone.status === 200){
                dispatch(searchSuccess(respone.data.project))
            }
            else {
                dispatch(Notification.Error(respone))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error => {
            dispatch(Notification.Error(error))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            },5000)
        })
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