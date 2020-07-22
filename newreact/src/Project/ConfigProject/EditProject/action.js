import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const forwarddata = (data) =>{
    return {
        type:'ACTION',
        data: data
    }
}
export const editSuccess = (data) => {
    return {
        type: 'EDIT_SUCCESS',
        data: data
    }
}
export const viewinfoproject = (data) =>{
    return {
        type:'GET_INFO_PROJECT',
        data: data
    }
}
export const listproject = (data) =>{
    return {
        type:'GETALLLISTPROJECT',
        data: data
    }
}

export const Action = (data) =>{
    return dispatch =>{
        return CallApi('url','POST',{
            data:data
        }).then (response =>{
            
            if(response.status === 201){
                dispatch(forwarddata(response.data));
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

export const ViewListProject = (data) =>{
    return dispatch =>{
        return CallApi('project/ViewListProject','GET',{
        }).then (response =>{
            
            if(response.status === 200){
                dispatch(listproject(response.data.listproject));
                
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


export const EditProject = (id, project) => {
    return dispatch => {
      return CallApi(`project/editInfoProject/${id}`,
      'PUT',
      {
        name: project.get('name'),
        dateedit: project.get('dateedit'),
        description: project.get('description'),
        image: project.get('avatar').name
      },
      'token'
      ).then(respone => {
        if (respone.status === 200) {
            dispatch(editSuccess(respone.data))
            // dispatch(Notification.CreateSuccess(message))
            // setTimeout(() => {
            //     dispatch(Notification.hideNotification)
            // }, 3000)
        } else {
            dispatch(Notification.Error(respone.data))
            setTimeout(() => {
                dispatch(Notification.hideNotification)
            }, 5000)
        }
      }).catch(err => {
          dispatch(Notification.ErrorAPI(err))
          setTimeout(() => {
              dispatch(Notification.hideNotification)
          }, 5000)
      })
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
            // dispatch(Notification.ErrorAPI(error));
            // setTimeout(() => {
            //     dispatch(Notification.hideNotification())
            // }, 5000)
        })
    }
}
