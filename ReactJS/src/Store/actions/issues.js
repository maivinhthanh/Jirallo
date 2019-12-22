import * as actionTypes from '../constants/issues';
import * as actionError from "./error";

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
export const EditIssue = data => {
  return {
    type: actionTypes.EditIssue,
    data
  }
}
export const removeIssueSucces = data => {
  return {
    type: actionTypes.removeIssueSucces,
    data
  }
}
export const AddIssueSuccess = data => {
  return {
    type: actionTypes.AddIssueSuccess,
    data
  }
}
export const changeProcessSuccess = (data) => {
  return {
    type: actionTypes.changeProcessSuccess,
    data
  }
}
export const assignTaskIssue = (data) => {
    return {
      type: actionTypes.assignTaskIssue,
      data
    }
}
export const ListIssueInBackLog = (data) => {
  return {
    type: actionTypes.showListIssueInBackLog,
    data
  }
}
export const AddAndSortSuccess = (data) => {
  return {
    type: actionTypes.addAndSortSuccess,
    data
  }
}
export const viewInfoIssues = (data) => {
  return {
    type: actionTypes.viewInfoIssues,
    data
  }
}

export const AddAndSortIssueInBacklog = (listIssue, idProject) => {
  return dispatch => {
    return CallApi(`project/addAndSortIssuesInBackLog/${idProject}`,
    'PUT',
    {
      listissues:listIssue
    },
    'token'
    ).then(respone => {
      console.log(respone)
      dispatch(AddAndSortSuccess(respone.data))
    }).catch(err => {
      dispatch(IssueError(err))
    })
  }
}

export const updateNameIssue = (name, id) => {
  return dispatch => {
      return CallApi(`issues/editIssues/${id}`,
      'PUT',
      {
        name: name
      },
     'token'
      ).then(respone=>{
        dispatch(EditIssue(respone.data.newissues))
      }).catch(err => {
        console.log(err)
      })
    }
}

export const changeProcessIssue = (idissues, processes) => {
  return dispatch => {
    return CallApi(`issues/changeProcessIssues/${idissues}`,
    'PUT',
    {process: processes},
    'token'
    ).then(respone => {
      console.log(respone)
      dispatch(changeProcessSuccess(respone.data.issues))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const removeIssue = (idissues) => {
  return dispatch => {
    return CallApi(`issues/deleteIssues/${idissues}`,
    'PUT',
    {},
    'token'
    ).then(respone => {
      dispatch(removeIssueSucces(idissues))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const AddIssueIntoSprint = (idIssue, idSprint) => {
  return dispatch => {
    return CallApi(`issues/addIssueIntoSprint/${idIssue}`,
    'PUT',
    {
      idsprint: idSprint
    },
    'token'
    ).then(respone => {
      dispatch(AddIssueSuccess(respone.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const assignTaskIssueAct = (idissues, idUser) => {
  return dispatch => {
    return CallApi(`issues/assignforUser/${idissues}`,
    'PUT',
    {
      iduser: idUser
    },
   'token'
    ).then(respone => {
      const data = [{respone: respone.data.data, idIssue: idissues}]
      dispatch(assignTaskIssue(data))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const EditIssuesAct = (id, issue) => {
  return dispatch => {
    return CallApi(`issues/editIssues/${id}`,
    'PUT',
    issue,
   'token'
    ).then(respone=>{
      dispatch(EditIssue(respone.data.newissues))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const showListIssueInBackLog = (id, iduser = null) => {
  return dispatch => {
    return CallApi(`issues/viewListIssuesInBackLog/${id}`,
    'POST',
    {iduser:iduser},
    'token'
    ).then (respone => {
      console.log(respone.data)
      dispatch(ListIssueInBackLog(respone.data))
    }).catch(err => {
      dispatch(IssueError(err))
    })
  }
}

export const showListIssueAct = (id) => {
  console.log(id)
  return dispatch => {
    return CallApi(`issues/viewListIssues/${id}`,
    'GET',
    {},
    'token'
    ).then (respone => {
      console.log(respone.data)
      dispatch(showListIssue(respone.data))
    }).catch(err => {
      console.log(err)
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
    'token'
    ).then (respone => {
      console.log(respone.data)
      dispatch(createIssue(respone.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
export const viewInfoIssuesAct =(id) => {
  return dispatch => {
    return CallApi(`issues/getInfoIssues/${id}`,
    'GET',
    {},
    'token'
    ).then (respone => {
      dispatch(viewInfoIssues(respone.data.issues))
    }).catch(err => {
      console.log(err)
    })
  }
}