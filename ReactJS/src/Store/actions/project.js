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
export const addMemberSuccess = (data) => {
  return {
    type: actionTypes.addSuccess,
    data
  }
}
export const getInfoSuccess = (data) => {
  return {
    type: actionTypes.getInfoSuccess,
    data
  }
}
export const EditProject = (project) => {
  return dispatch => {
    return CallApi(`project/editInfoProject/${project.idproject}`,
    'PUT',
    {
      name: project.name,
      datecreate: project.datecreate,
      dateedit: project.dateedit,
      description: project.description,
      image: project.image
    },
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    })
  }
}
export const getInfoProject = (id) => {
  return dispatch => {
    return CallApi(`project/viewInfoProject/${id}`, 
    'GET',
    {},
    'token'
    ).then (respone => {
      dispatch(getInfoSuccess(respone.data))
    }).catch(err => {
      dispatch(projectError(err))
    })
  }
}
export const AddMemberAct =(idproject,user) => {
  return dispatch => {
    return CallApi(`project/AddMember/${idproject}`,
    'PUT',
    {
      iduser: user._id,
      position: user.position
    },
    'token'
    ).then(respone => {
      dispatch(addMemberSuccess(respone.data))
    }).catch(err => {
      dispatch(projectError(err))
    })
  }
}

export const getListProjectAct = () =>{
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