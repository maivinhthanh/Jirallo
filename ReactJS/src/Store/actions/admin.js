import * as actionTypes from "../constants/admin";
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

export const SearchAction = email => {
  return dispatch => {
    console.log(document.cookie)
    return CallApi(
      "auth/findUserLikeEmail",
      "POST",
      {
        email: email
      },
      document.cookie.split("=")[1]
    )
      .then(respone => {
        if (respone.data.result.length !== 0) {
          dispatch(Search(respone.data.result));
        } else {
          dispatch(SearchError("Error"));
        }
      })
      .catch(error => {
        dispatch(SearchError(error));
      });
  };
};
