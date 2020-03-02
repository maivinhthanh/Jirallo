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
