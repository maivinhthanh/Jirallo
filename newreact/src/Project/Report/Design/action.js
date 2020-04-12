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
export const AddObject = (idgroup, idui)=>{
    return {
        type:'ADD_OBJECT',
        idgroup, idui
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
export const AddGroup = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/addGroup/${idreport}`,'POST',data)
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
export const UpdateNameGroup = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateNameGroup/${idreport}`,'PUT',data)
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
export const AddInterface = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/addInterface/${idreport}`,'PUT',data)
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
export const PushImageInterface = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/pushImageInterface/${idreport}`,'POST',data)
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
export const DeleteImageInterface = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/deleteImageInterface/${idreport}`,'PUT',data)
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
export const UpdateImageInterface = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateImageInterface/${idreport}`,'PUT',data)
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
export const UpdateInterface = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateInterface/${idreport}`,'PUT',data)
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
export const UpdateObject = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateObject/${idreport}`,'PUT',data)
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