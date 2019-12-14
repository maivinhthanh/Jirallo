import * as actionTypes from "../constants/admin";
import * as actionError from "./error";

import CallApi from "../../until/apiCaller";

export const Search = data => {
  return {
    type: actionTypes.SearchSuccess,
    data: data
  };
};
export const SearchError = name => {
  return {
    type: actionTypes.SearchError,
    message: name
  };
};
export const Find = data => {
  return {
    type: actionTypes.FindSuccess,
    data: data
  };
};
export const FindError = name => {
  return {
    type: actionTypes.FindError,
    message: name
  };
};
export const EditUser = (user) =>{
  return {
      type: actionTypes.EditUserSuccess,
      data: user
  }
}
export const EditUserFail = (name) =>{
  return {
      type: actionTypes.EditUserFail,
      message: name
  }
}

export const EditUserAction = (id,user) =>{
  return dispatch =>{
      return CallApi(`auth/editProfile/${id}`,'PUT',
      {
          gender : user[0].gender,
          avatar: user[0].avatar,
          name:user[0].name,
          birthdate: user[0].birthday
      },
      'token'
      ).then(response =>{
          if(response.data.result.length !== 0){
              dispatch(EditUser(response.data.result))
          }
      })
      .catch(err =>{
         console.log(err)
      })
  }
}
export const SearchAction = email => {
  return dispatch => {
    return CallApi(
      "auth/findUserLikeEmail",
      "POST",
      {
        email: email
      },
      'token'
    )
      .then(respone => {
        if (respone.data.result.length !== 0) {
          dispatch(Search(respone.data.result));
        } else {
          dispatch(actionError.AlertError("Error"));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
// return CallApi(
//   "auth/findUserID/" + id,
//   "GET",{},
//   'token'
// )
export const FindUserAction = id => {
  return dispatch => {
    return CallApi(`auth/findUserID/${id}`,
    'GET',
    {},
    'token'
    )
      .then(respone => {
        if (respone.data.result.length !== 0) {
          dispatch(Find(respone.data.result));
        } else {
          dispatch(actionError.AlertError("Error"));
        }
      })
      .catch(error => {
        console.log(error)
        console.log(error);
      });
  };
};
