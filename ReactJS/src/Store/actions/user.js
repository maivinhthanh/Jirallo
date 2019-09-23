import * as actionTypes from "../constants/user";
import CallApi from "../../until/apiCaller";

export const AddUserSuccess = data =>{
  return {
    type: actionTypes.AddUserSuccess,
    data: data 
  }
}
export const ErrorUser = name =>{
  return {
    type: actionTypes.ErrorUser,
    message: name
  }
}
export const insertUserToGroup = (email,id) =>{
  return dispatch =>{
    return CallApi("group/addMember",
    "PUT",
    {
      email: email,
      idGroup: id
    },
    document.cookie.split("=")[2]
    )
    .then (respone =>{
      console.log(respone);
      dispatch(AddUserSuccess(respone.data.result))
    })
    .catch(err =>{
      dispatch(ErrorUser(err))
    })
  }
}