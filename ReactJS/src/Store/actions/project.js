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
export const findProjectSuccess = (data) => {
  return {
    type: actionTypes.findProjectSuccess,
    data
  }
}
export const viewListIssuesInProjectSuccess = (data) => {
  return {
    type: actionTypes.viewListIssuesInProjectSuccess,
    data
  }
}
export const getListUserInProjectSuccess = (data) => {
  return {
    type: actionTypes.getListUserInProjectSuccess,
    data
  }
}

export const editEditNameProject = (name, id) => {
  return dispatch => {
    return CallApi(`project/editInfoProject/${id}`,
    'PUT',
    {
      name: name
    },
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    })
  }
}
export const findProjectLikeId = (id) => {
  return dispatch => {
    return CallApi(`project/FindProjectByID/${id}`,
    'GET',
    {},
    'token'
    ).then(respone => {
      dispatch(findProjectSuccess(respone.data.project))
    }).catch(err => {
     dispatch(projectError(err))
    })
  }
}
export const getListUserInProject = (id) => {
  return dispatch => {
    return CallApi(`project/getListUserInProject/${id}`,
    'GET',
    {},
    'token'
    ).then(respone => {
      dispatch(getListUserInProjectSuccess(respone.data.listuser))
    }).catch(err => {
     dispatch(projectError(err))
    })
  }
}
export const viewListIssuesInProject = (id) => {
  return dispatch => {
    return CallApi(`project/viewListIssuesInProject/${id}`,
    'GET',
    {},
    'token'
    ).then(respone => {
      dispatch(viewListIssuesInProjectSuccess(respone.data.project))
    }).catch(err => {
     dispatch(projectError(err))
    })
  }
}
export const EditProject = (id, project) => {
  return dispatch => {
    return CallApi(`project/editInfoProject/${id}`,
    'PUT',
    {
      name: project.get('name'),
      dateedit: project.get('dateedit'),
      description: project.get('description'),
      image: project.get('avatar').name
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