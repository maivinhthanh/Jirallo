import * as actionTypes from "../constants/member";
import * as actionError from "./error";

import CallApi from "../../until/apiCaller";

export const Search = data => {
  return {
    type: actionTypes.Success,
    data: data
  };
};
export const SearchError = name => {
  return {
    type: actionTypes.ErrorSearch,
    message: name
  };
};

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
          dispatch(actionError.AlertError('err'))
        }
      })
      .catch(err => {
        console.log(err)
      });
  };
};
