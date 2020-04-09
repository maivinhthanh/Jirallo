import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const editintroduce = (report) =>{
    return {
        type:'EDIT_COVER',
        data: report
    }
}
export const AddParagraph = (name, key) =>{
    return {
        type:'ADD_PARAGRAPH_BRIEF',
        data: name,
        key: key
    }
}
export const AddFlow = (index)=>{
    return {
        type:'ADD_FLOW',
        index: index
    }
}
export const AddException = (index)=>{
    return {
        type:'ADD_EXCEPTION',
        index: index
    }
}
export const AddParagraphFlow = (indexUsecase, indexFlow)=>{
    return {
        type:'ADD_PARAGRAPH_FLOW',
        indexUsecase:indexUsecase,
        indexFlow:indexFlow
    }
}
export const AddParagraphException = (indexUsecase, indexFlow)=>{
    return {
        type:'ADD_PARAGRAPH_EXCEPTION',
        indexUsecase:indexUsecase,
        indexFlow:indexFlow
    }
}
export const AddUsecase = (idreport, type ) =>{
    return dispatch =>{
        return CallApi(`report/addUsecase/${idreport}`,'POST', {
            type: type
        })
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
export const UpdateUsecase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateUsecase/${idreport}`,'PUT', data)
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

export const UpdateTitleUsecase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateTitleUsecase/${idreport}`,'PUT', data)
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
export const UpdateImageDiagram = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateImageDiagram/${idreport}`,'PUT', data)
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
export const UpdateImageUsecase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/updateImageDescript/${idreport}`,'PUT', data)
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

export const DeleteImageUsecase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/deleteImageUsecase/${idreport}`,'PUT', data)
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
export const PushImageUsecase = (idreport, data ) =>{
    return dispatch =>{
        return CallApi(`report/pushImageUsecase/${idreport}`,'POST', data)
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
export const UpdateBasicFlows = (idreport, basicflows, idusecase ) =>{
    return dispatch =>{
        return CallApi(`report/updateBasicFlows/${idreport}`,'PUT', {
            basicflows:basicflows,
            idusecase: idusecase
        })
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
export const UpdateException = (idreport, exception, idusecase ) =>{
    return dispatch =>{
        return CallApi(`report/updateException/${idreport}`,'PUT', {
            exception:exception,
            idusecase: idusecase
        })
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