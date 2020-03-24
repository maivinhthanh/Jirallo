import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editcover = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}

export const EditCover = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/editCover/${idreport}`,'POST',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editcover(response.data.report));
                
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