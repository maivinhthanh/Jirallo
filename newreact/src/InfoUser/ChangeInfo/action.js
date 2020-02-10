import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const edituser = (data) =>{
    return {
        type:'CHANGE_INFO_USER',
        data: data
    }
}

export const getinfouser = (data) =>{
    console.log(data)
    return {
        type:'GET_INFO_USER',
        data: data
    }
}

export const ChangeInfoUser = (id, user) =>{
    return dispatch =>{
        return CallApi(`auth/editProfile/${id}`,'PUT',
        {
            gender : user.gender,
            avatar: user.avatar,
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthday
        }).then (response =>{
            
            if(response.status === 200){
                dispatch(edituser(response.data));
                dispatch(Notification.CreateSuccess({message: 'Sửa thành công'}))
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
export const GetInfoUser = (id) =>{
    console.log(typeof id)
    return dispatch =>{
        return CallApi(`auth/findUserID/${id}`,
        'GET',
        {
            
        }).then (response =>{
            
            if(response.status === 200){
                dispatch(getinfouser(response.data.result));
                
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
