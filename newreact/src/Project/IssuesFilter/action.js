import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const viewinfoproject = (data) =>{
    return {
        type:'GET_INFO_PROJECT',
        data: data
    }
}

export const ViewInfoProject = (id) =>{
    return dispatch =>{
        return CallApi(`project/viewInfoProject/${id}`,'GET',{
        }).then (response =>{
            if(response.status === 200){
                dispatch(viewinfoproject(response.data.project));
                
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
export const showlistsprint = (data) =>{
    return {
        type:'SHOW_LIST_SPRINT',
        data: data
    }
}

export const ShowListSprint = (id,iduser = null) => {
    return dispatch => {
        return CallApi(`sprint/viewListSprint/${id}`,
        'POST',
        {iduser:iduser}
        ).then (response =>{
            if(response.status === 201){
                dispatch(showlistsprint(response.data.listsprint));
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