import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

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
export const addcomment = (data) =>{
    return {
        type:'ADD_COMMENT',
        data: data
    }
}

export const AddComment = (idissues, data) =>{
    console.log(data)
    return dispatch =>{
        return CallApi(`issues/createComment/${idissues}`,'POST',{
            content: data.content,
            assignee: data.assignee
        }).then (response =>{
            console.log(response)
            if(response.status === 201){
                
                dispatch(addcomment(response.data));
                
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
