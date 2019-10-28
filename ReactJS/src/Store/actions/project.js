import * as actionTypes from '../constants/project';
import CallApi from '../../until/apiCaller';


export const projectError = (status) => {
  return {
    type: actionTypes.projectError,
    message: status
  }
}
export const createProject = (data) => {
  return {
    type: actionTypes.createProject,
    result : data
  }
}
export const getAllList = (data) => {
  return {
    type: actionTypes.getAllList,
    data: data
  }
}
export const AddMemberAct =(id,user) => {
  return dispatch => {
    return CallApi(`project/AddMember/${id}`,
    'PUT',
    {
      iduser: user.email,
      position: user.position
    },
    'token'
    ).then(respone => {
      console.log(respone)
      // dispatch(addMemberSuccess(respone))
    }).catch(err => {
      console.log(err)
    })
  }
}

export const getListProjectAct = () =>{
  console.log(document.cookie)
  return dispatch => {
    return CallApi('project/ViewListProject',
    'GET',
    {},
    'token'
    ).then(respone => {
      dispatch(getAllList(respone.data.listproject))
    }).catch(err =>{
      dispatch(projectError(err))
    })

  }
}
export const createProjectAct = (name) => {
  return dispatch => {
    return CallApi('project/createProject',
    'POST',
    {
      name : name
    },
    'token'
    )
    .then (respone => {
      dispatch(createProject(respone.data.newproject))
    })
    .catch(err =>{
       dispatch(projectError(err))
    })
  }
}