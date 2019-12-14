import CallAPI from '../../until/apiCaller'
import * as actionTypes from '../constants/epic'
import * as actionError from "./error";

import { ErrorUser } from './user'

export const createEpic = (data) =>{
  return {
    type: actionTypes.createEpic,
    data
  }
}
export const ErrorEpic = (error) =>{
  return {
    type: actionTypes.ErrorEpic,
    message: error
  }

}
export const viewList = (data) => {
  return {
    type: actionTypes.viewList,
    data
  }
}
export const editEpic = (data) => {
  return {
    type: actionTypes.editEpic,
    data
  }
}

export const showListIssueOfEpicAct = (id) => {
  return dispatch => {
    return CallAPI(`epic/viewListIssuesInEpic/${id}`,
    'GET',
    {},
    'token'
    ).then(repsone => {
      console.log(repsone);
    }).catch(err => {
      console.log(err)
    })
  }
}
export const updateNameEpic = (name, id) => {
  return dispatch => {
    return CallAPI(`epic/editEpic/${id}`,
    'PUT',
    { name : name},
    'token'
    ).then(respone => {
      dispatch(editEpic(respone.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const EditepicAct = (name, id) => {
  return dispatch => {
    return CallAPI(`epic/editEpic/${id}`,
    'PUT',
    { name : name},
    'token'
    ).then(respone => {
      dispatch(editEpic(respone.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const viewListEpicAct = (idProject) => {
  return dispatch => {
    return CallAPI(`epic/viewListEpic/${idProject}`,
    'GET',
    {},
    'token'
    ).then (respone => {
      dispatch(viewList(respone.data))
    }).catch(err => {
      console.log(err)
    })
  }
}

export const createEpicAct = (epic) =>{
  return dispatch => {
    return CallAPI('epic/createEpic',
    'POST',
    {
      name: epic.nameEpic,
      idproject:epic.idProject
    },
    'token'
    )
    .then (respone =>{
      dispatch(createEpic(respone.data))
    })
    .catch(err =>{
      console.log(err)
    })
  }
}