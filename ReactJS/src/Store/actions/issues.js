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
        dispatch(IssueError(err))
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
      dispatch(changeProcessSuccess(respone))
    }).catch(err => {
      dispatch(IssueError(err))
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
      dispatch(IssueError(err))
    })
  }
}
export const AddIssueIntoSprint = (idIssue, idSprint) => {
  console.log(idIssue, idSprint)
  return dispatch => {
    return CallApi(`issues/addIssueIntoSprint/${idIssue}`,
    'PUT',
    {
      idsprint: idSprint
    },
    'token'
    ).then(respone => {
      console.log(respone)
      dispatch(AddIssueSuccess(respone))
    }).catch(err => {
      dispatch(IssueError(err))
    })
  }
}
export const assignTaskIssueAct = (idissues, idUser) => {
  console.log(idissues, idUser)
  return dispatch => {
    return CallApi(`issues/assignforUser/${idissues}`,
    'PUT',
    {
      iduser: idUser
    },
   'token'
    ).then(respone => {
      console.log(respone.data.data)
      const data = [{respone: respone.data.data, idIssue: idissues}]
      console.log(data)
      dispatch(assignTaskIssue(data))
    }).catch(err => {
      dispatch(IssueError(err))
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
      dispatch(IssueError(err))
    })
  }
}
export const showListIssueAct = (id) => {
  return dispatch => {
    return CallApi(`issues/viewListIssues/${id}`,
    'GET',
    {},
    'token'
    ).then (respone => {
      dispatch(showListIssue(respone.data))
    }).catch(err => {
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
    'token'
    ).then (respone => {
      dispatch(createIssue(respone.data))
    }).catch(err => {
      dispatch(IssueError(err))
    })
  }
}