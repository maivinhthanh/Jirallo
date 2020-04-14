import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editintroduce = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}
export const AddParagraph = (name) =>{
    return {
        type:'ADD_PARAGRAPH_SETTING',
        name: name
    }
}

export const UpdateSetting = (idreport, setting ) =>{
    return dispatch =>{
        return CallApi(`report/updateSetting/${idreport}`,'PUT',{setting})
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