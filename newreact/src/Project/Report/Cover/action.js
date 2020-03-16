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