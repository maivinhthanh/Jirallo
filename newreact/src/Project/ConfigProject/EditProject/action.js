import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const forwarddata = (data) =>{
    return {
        type:'ACTION',
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
        console.log(respone)
      }).catch(err => {
        console.log(err)
      })
    }
  }