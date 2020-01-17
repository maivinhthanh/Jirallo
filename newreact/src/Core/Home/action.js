import Cookies from 'js-cookie'

import CallApi from '../../until/apiCaller';

export const LogOut = (data) =>{
    return {
        type: 'LogOut',
        data: data
    }
}
export const logout = () =>{
    const refreshToken = Cookies.get('refreshtoken')
    return dispatch =>{
        return CallApi(`auth/logout`,'POST',
        {refreshToken: refreshToken},
        'token'
        ).then(response =>{
            localStorage.clear('user')
            Cookies.remove('token');
            Cookies.remove('refreshtoken');
            dispatch(LogOut(response.data))
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}