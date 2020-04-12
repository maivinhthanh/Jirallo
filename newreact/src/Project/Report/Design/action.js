import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editintroduce = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}
export const AddParagraphDescriptWebsite = (key) =>{
    return {
        type:'ADD_PARAGRAPH_DESCRIPT_WEBSITE',
        key: key
    }
}
export const UpdateDescriptWebsite = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateDescriptWebsite/${idreport}`,'PUT',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.newreport));
                
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
export const PushImageDatabase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/pushImageDatabase/${idreport}`,'POST',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.newreport));
                
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
export const DeleteImageDatabase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/deleteImageDatabase/${idreport}`,'PUT',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.newreport));
                
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
export const UpdateImageDatabase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateImageDatabase/${idreport}`,'PUT',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.newreport));
                
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