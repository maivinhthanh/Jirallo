import Cookies from 'js-cookie'

import CallApi from '../../until/apiCaller';

export const refreshToken = () =>{
    const refreshToken = Cookies.get('refreshtoken')
    return dispatch =>{
        return CallApi(`auth/refreshToken`,'POST',
        {refreshToken: refreshToken},
        'token'
        ).then(response =>{
            Cookies.set('token', response.data.accessToken, { expires: 1 });
        })
        .catch(err =>{
           console.log(err)
        })
    }
}
