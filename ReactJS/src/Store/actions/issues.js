import * as actionTypes from '../constants/issues';
import CallApi from '../../until/apiCaller';

export const createIssue = data => {
  return {
    type: actionTypes.createIssue,
    data
  }
}
export const IssueError = error => {
  return {
    type: actionTypes.IssueError,
    message: error
  }

}
export const showListIssue = data => {
  return {
    type: actionTypes.showListIssue,
    data
  }

}
export const showListIssueAct = (id) => {
  return dispatch => {
    return CallApi(`issues/viewListIssues/${id}`,
    'GET',
    {},
    document.cookie.split("=")[2]
    ).then (respone => {
      console.log(respone)
      dispatch(showListIssue(respone.data))
    }).catch(err => {
      // console.log(err)
      dispatch(IssueError(err))
    })
  }
}

export const createIssuesAct =(id, name, type) => {
  return dispatch => {
    return CallApi('issues/createIssues',
    'POST',
    {
      name: name,
      idproject: id,
      type: type
    },
    document.cookie.split("=")[2]
    ).then (respone => {
      console.log(respone)
      dispatch(createIssue(respone.data))
    }).catch(err => {
      console.log(err)
      dispatch(IssueError(err))
    })
  }
}