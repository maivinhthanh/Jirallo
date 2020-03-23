import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const viewinfoproject = (data) =>{
    return {
        type:'GET_INFO_PROJECT',
        data: data
    }
}
export const getreportinproject = (data) =>{
    return {
        type:'GET_REPORT_IN_PROJECT',
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
export const GetReportInProject = (id) =>{
    return dispatch =>{
        return CallApi(`report/getReportInProject/${id}`,'GET',{
        }).then (response =>{
            if(response.status === 200){
                dispatch(getreportinproject(response.data.report));
                
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

