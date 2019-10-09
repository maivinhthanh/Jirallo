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
    return CallApi(
      "auth/findUserLikeEmail",
      "POST",
      {
        email: email
      },
      document.cookie.split("=")[2]
    )
      .then(respone => {
        console.log(respone)
        if (respone.data.result.length !== 0) {
          console.log(respone)
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
