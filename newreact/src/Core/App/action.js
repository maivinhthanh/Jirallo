import Cookies from 'js-cookie'

import CallApi from '../../until/apiCaller';
export const refreshToken = () =>{
    const refreshToken = Cookies.get('refreshtoken')
    return dispatch =>{
        return CallApi(`auth/refreshToken`,'POST',
        {refreshToken: refreshToken},
        'token'
        ).then(response =>{
            if(response.status === 200){
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
            
        })
        .catch(err =>{
        })
    }
}
