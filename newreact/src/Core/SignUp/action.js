import CallApi from '../../until/apiCaller';
import * as Notification from '../../until/Notification';

export const register = (data) =>{
    return {
        type:'Register',
        id: data.userId
    }
}

export const RegisterAction = (email,password, firstname, lastname, gender) =>{
    return dispatch =>{
        return CallApi('auth/signup','PUT',{
            email:email,
            password:password,
            firstname: firstname,
            lastname: lastname,
            gender:gender
        }).then (response =>{
            
            if(response.status === 201){
                dispatch(register(response.data));
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
