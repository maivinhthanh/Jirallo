import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const getinfoproject = (data) =>{
    return {
        type:'GET_INFO_PROJECT',
        data: data
    }
}
export const getissuesinsprintactive = (data) =>{
    return {
        type:'GET_ISSUES_IN_SPRINT_ACTIVE',
        data: data
    }
}
export const GetInfoProject = (id) =>{
    return dispatch =>{
        return CallApi(`project/viewInfoProject/${id}`,'GET',
        {}
        ).then (response =>{
            
            if(response.status === 200){
                dispatch(getinfoproject(response.data.project));
                
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
export const GetIssuesInSprintActive = (id, user) =>{
    return dispatch =>{
        return CallApi(`project/getIssuesInSprintActive/${id}`,'POST',
        {user:user},
        ).then (response =>{
            
            if(response.status === 200){
                dispatch(getissuesinsprintactive(response.data.idissues));
                
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
export const changeprocessissue = (data) =>{
    return {
        type:'CHANGE_PROCESS_ISSUE',
        data: data
    }
}
export const ChangeProcessIssue = (idissues, processes) =>{
    return dispatch =>{
        return CallApi(`issues/changeProcessIssues/${idissues}`,'PUT',
        {process: processes},
        ).then (response =>{
            if(response.status === 201){
                dispatch(changeprocessissue(response.data.issues));
                
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