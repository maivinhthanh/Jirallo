import * as actionTypes from "../constants/user";
import * as actionError from "./error";

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
export const getListUser = data => {
  return {
    type: actionTypes.GetListUser,
    data
  }
}
export const findUserLikeId = data => {
  return {
    type: actionTypes.FindUserLikeId,
    data
  }
}

export const findUserLikeIDAct = (id) => {
  return dispatch => {
    return CallApi(`auth/FindUserLikeID/${id}`,
    "GET",
    {},
    'token'
    ).then(respone => {
      dispatch(findUserLikeId(respone.data.result))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const getListUserAct = () => {
  return dispatch => {
    return CallApi("auth/getListUser",
    "GET",
    {},
    'token'
    ).then (respone => {
      dispatch(getListUser(respone.data.result))
    }).catch(err => {
      console.log(err)
    })
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
   'token'
    )
    .then (respone =>{
      dispatch(AddUserSuccess(respone.data.result))
    })
    .catch(err =>{
      console.log(err)
    })
  }
}