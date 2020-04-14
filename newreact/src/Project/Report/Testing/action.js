import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editintroduce = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}
export const AddTesting = (index) =>{
    return {
        type:'ADD_PARAGRAPH_TESTING',
        index: index
    }
}

export const UpdateContentTesting = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateContentTesting/${idreport}`,'PUT',data)
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
export const UpdateTitleTesting = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateTitleTesting/${idreport}`,'PUT',data)
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
export const AddGroupTesting = (idreport ) =>{
    return dispatch =>{
        return CallApi(`report/addTesting/${idreport}`,'POST')
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
export const DeleteTesting = (idreport,idtesting ) =>{
    return dispatch =>{
        return CallApi(`report/deleteTesting/${idreport}`,'POST',{idtesting})
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
export const DeleteObjectTesting = (idreport,idtesting, idobject) =>{
    return dispatch =>{
        return CallApi(`report/deleteObjectTesting/${idreport}`,'PUT',{idtesting, idobject})
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