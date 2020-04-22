import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editintroduce = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}
export const AddParagraphConclude = (name) =>{
    return {
        type:'ADD_PARAGRAPH_CONCLUDE',
        data: name
    }
}
export const AddParagraphReference = (name) =>{
    return {
        type:'ADD_PARAGRAPH_REFERENCE',
        data: name
    }
}
export const EditConclude = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/editConclude/${idreport}`,'PUT',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.report));
                
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
export const EditReference = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/editReference/${idreport}`,'PUT',data)
        .then (response =>{
            if(response.status === 200){
                
                dispatch(editintroduce(response.data.report));
                
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