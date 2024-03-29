import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const addprocess = (data) =>{
    return {
        type:'ADD_PROCESS',
        data: data
    }
}

export const deleteprocess = (data) =>{
    return {
        type:'DELETE_PROCESS',
        data: data
    }
}
export const AddProcess = (idproject, process) =>{
    return dispatch =>{
        return CallApi(`project/AddProcess/${idproject}`,'PUT',{
            process: process
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(addprocess(response.data.project));
                dispatch(Notification.CreateSuccess({message: 'Tạo thành công'}))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
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
export const DeleteProcess = (idproject, process) =>{
    return dispatch =>{
        return CallApi(`project/deleteProcess/${idproject}`,'PUT',{
            nameProcess: process
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(deleteprocess(process));
                dispatch(Notification.CreateSuccess({message: 'Xóa thành công'}))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
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
