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
export const deleteSprintSuccess = data => {
  return {
    type: actionTypes.deleteSprintSuccess,
    data
  }
}
export const beginSprint = (idSprint, idProject) => {
  return dispatch => {
    return CallApi(`sprint/beginsprint/${idProject}`,
    'PUT',
    {idsprint: idSprint},
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    }) 
  }
}
export const updateNameAct = (name, id) => {
  console.log(name, id)
  return dispatch => {
    return CallApi(`sprint/editSprint/${id}`,
    'PUT',
    {
      name: name,
    },
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    })
  }
}
export const completeSprintAct =(id) => {
  return dispatch => {
    return CallApi(`sprint/completeSprint/${id}`,
    'PUT',
    {},
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    })
  }
}
export const deleteSprint = (id) => {
  return dispatch => {
    return CallApi(`sprint/deleteSprint/${id}`,
    'PUT',
    {},
    'token'
    ).then(respone => {
      console.log(respone)
      dispatch(deleteSprintSuccess(respone.data))
    }).catch(err => {
      dispatch(errorSprint(err))
    })
  }
}
export const ViewListIssueInSprint = (id) => {
  return dispatch => {
    return CallApi(`sprint/completeSprint/${id}`,
    'PUT',
    {},
    'token'
    ).then(respone => {
      console.log(respone)
    }).catch(err => {
      console.log(err)
    })
  }
}
export const showListSprintAct = (id) => {
  return dispatch => {
    return CallApi(`sprint/viewListSprint/${id}`,
    'GET',
    {},
   'token'
    ).then (respone => {
      dispatch(showListSprint(respone.data.listsprint))
    }).catch(err => {
      dispatch(errorSprint(err))
    })
  }
}
export const createSprintAct = (data, id) => {
  return dispatch => {
    return CallApi(`sprint/createSprint`,
    'POST',
    {
      name: data,
      idproject : id
    },
   'token'
    ).then(respone => {
      dispatch(createSprint(respone.data))
    }).catch(err => {
      dispatch(errorSprint(err))
    })
  }
}