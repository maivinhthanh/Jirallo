import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const selectIssues = (issue) =>{
    return {
        type:'SELECT_ISSUES_IN_FILTER',
        data: issue
    }
}
export const SelectIssues = (idissues, ) =>{
    return dispatch =>{
        return CallApi(`issues/getInfoIssues/${idissues}`,'GET',{
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(selectIssues(response.data.issues));
                
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

export const filterissues = (data) =>{
    return {
        type:'FILTER_ISSUES',
        data: data
    }
}

export const FilterIssues = (idproject, process) =>{
    return dispatch =>{
        return CallApi(`issues/filterListIssues/${idproject}`,'POST',{
            process: process
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(filterissues(response.data.listissues));
                
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
export const getcomment = (data) =>{
    return {
        type:'GET_COMMENT',
        data: data
    }
}

export const GetComment = (idissues, data) =>{
    return dispatch =>{
        return CallApi(`issues/getListComment/${idissues}`,'GET',{
           
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(getcomment(response.data.listcomment));
                
            }
            else {
                dispatch(Notification.Error(response.data.newcomment))
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
