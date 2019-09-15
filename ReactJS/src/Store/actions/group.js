import * as actionTypes from '../constants/auth';
import CallApi from '../../until/apiCaller';

export const getGroup = (data) =>{
  return {
      type:actionTypes.getGroup,
      id: data.userId
  }
}

export const getGroupAction = (email,password,fullname) =>{
    return dispatch =>{
      dispatch(getGroup({id:1, name: 'nhi', manager : '876543'}));
    //   return CallApi('auth/login', 'POST',{
    //     email: email,
    //     password: password
    //   }).then( response => {
    //     dispatch(login(response.data));
    //  } )
    //  .catch( error => {
    //      dispatch(loginfail());
    //  } );
};
    }
}