import * as actionTypes from "../constants/sprint";
import CallApi from "../../until/apiCaller";


export const createSprint = data => {
  return {
    type: actionTypes.createSprint,
    data
  }
}
export const errorSprint = error => {
  return {
    type: actionTypes.errorSprint,
    message: error
  }
}
export const showListSprint = data => {
  return {
    type: actionTypes.showListSprint,
    data
  }
}
export const showListSprintAct = (id) => {
  return dispatch => {
    return CallApi(`sprint/viewListSprint/${id}`,
    'GET',
    {},
    document.cookie.split("=")[2]
    ).then (respone => {
      console.log(respone)
      dispatch(showListSprint(respone.data.listsprint))
    }).catch(err => {
      dispatch(errorSprint(err))
    })
  }
}
export const createSprintAct = (data, id) => {
  console.log(data, id)
  return dispatch => {
    return CallApi(`sprint/createSprint`,
    'POST',
    {
      name: data,
      idproject : id
    },
    document.cookie.split("=")[2]
    ).then(respone => {
      console.log(respone);
      dispatch(createSprint(respone.data))
    }).catch(err => {
      console.log(err)
      dispatch(errorSprint(err))
      // console.log(err)
    })
  }
}