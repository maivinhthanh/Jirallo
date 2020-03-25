import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const forwarddata = (data) =>{
    return {
        type:'ACTION',
        data: data
    }
}
export const findUserLikeEmail = data => {
    return {
      type: 'FIND_USER_LIKE_EMAIL',
      data
    }
  }
  export const addMemberSuccess = (data) => {
    return {
      type: 'ADD_MEMBER_SUCCESS',
      data
    }
  }
  export const projectError = (status) => {
    return {
      type: 'PROJECT_ERROR',
      message: status
    }
  }
  export const getListUserInProjectSuccess = (data) => {
    return {
      type: 'GET_LIST_USER_IN_PROJECT',
      data
    }
  }
  export const getListUserInProject = (id) => {
    return dispatch => {
      return CallApi(`project/getListUserInProject/${id}`,
      'GET',
      {},
      'token'
      ).then(respone => {
        dispatch(getListUserInProjectSuccess(respone.data.listuser))
      }).catch(err => {
        console.log(err)
      })
    }
  }
  export const AddMemberAct =(idproject,user) => {
    return dispatch => {
      return CallApi(`project/AddMember/${idproject}`,
      'PUT',
      {
        iduser: user._id,
        position: user.position
      },
      'token'
      ).then(respone => {
        dispatch(addMemberSuccess(respone.data))
      }).catch(err => {
        dispatch(projectError(err))
      })
    }
  }
export const findUserLikeEmailAct = (email) => {
    return dispatch => {
      return CallApi(`auth/findUserLikeEmail`,
      "POST",
      {email: email},
      'token'
      ).then(respone => {
        dispatch(findUserLikeEmail(respone.data.result))
      }).catch(err => {
        console.log(err)
      })
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