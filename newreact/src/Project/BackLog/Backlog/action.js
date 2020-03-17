import CallApi from '../../../until/apiCaller';
import * as Notification from '../../../until/Notification';

export const showlistissueinbacklog = (data) =>{
    return {
        type:'SHOW_LIST_ISSUES_IN_BACKLOG',
        data: data
    }
}
export const addNameSprint = (data) => {
    return {
        type: 'ADD_NAME_SPRINT',
        data: data
    }
}
export const beginSprint = (data) => {
    //Send data to server not write reducer
    return {
        type: 'BEGIN_SPRINT',
        data
    }
}
export const updateName = (data) => {
    return {
        type: 'UPDATE_NAME',
        data
    }
}
export const getInfoIssue = (data) => {
    return {
        type: 'GET_INFO_ISSUE',
        data
    }
}
export const createIssueBacklog = (data) => {
    return {
        type: 'CREATE_ISSUE_BACKLOG',
        data
    }
}
export const showInfomationIssue = (id) => {
    return dispatch => {
        return CallApi(`issues/getInfoIssues/${id}`,'GET').then(respone => {
            dispatch(getInfoIssue(respone.data))
        }).catch(err => {
            dispatch(Notification.Error(err))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
        })
    }
}
export const createIssue = (issue, idproject) => {
    return dispatch => {
        return CallApi(`issues/createIssues`, 'POST',{
            name: issue.name,
            priority: issue.priority,
            process: issue.process,
            tag: issue.tag,
            type: issue.type,
            idproject
        }).then(respone => {
            dispatch(createIssueBacklog(respone.data))
        }).catch(err => {
            dispatch(Notification.Error(err))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}
// export const createIssue = (name, type, idproject) => {
//     return dispatch => {
//         return CallApi(`issues/createIssues`, 'POST', {
//             name,
//             type,
//             idproject
//         }).then(respone => {
//             console.log(respone)
//         })
//     }
// }
export const updateNameSprint = (id, name) => {
    return dispatch => {
        return CallApi(`sprint/editSprint/${id}`,'PUT',{
            name
        }).then(respone => {
            let data = respone.data.newsprint
            data.id = id
            dispatch(updateName(data))
        }).catch(err => {
            dispatch(Notification.Error(err))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}
export const beginStatusSprint = (idsprint, idproject) => {
    return dispatch => {
        return CallApi(`sprint/beginsprint/${idproject}`,'PUT',{
            idsprint
        }).then(response => {
            if(response.status === 201) {
                dispatch(beginSprint(response.data.newsprint))
            }
        }).catch(err => {
            dispatch(Notification.Error(err))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}

export const handleSaveName = (name,id) => {
    return dispatch => {
        return CallApi('sprint/createSprint','POST',{
            name: name,
            idproject: id
        }).then(response => {
            console.log('200',response.data)
            if(response.status === 201){
                dispatch(addNameSprint(response.data.newsprint));
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        }).catch(err => {
            dispatch(Notification.Error(err))
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}
export const ShowListIssueInBackLog = (id, iduser = null) =>{
    return dispatch =>{
        return CallApi(`issues/viewListIssuesInBackLog/${id}`,'POST',{
            iduser:iduser
        }).then (response =>{
            if(response.status === 201){
                dispatch(showlistissueinbacklog(response.data.listissues));
                
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}

export const showlistsprint = (data) =>{
    return {
        type:'SHOW_LIST_SPRINT',
        data: data
    }
}

export const ShowListSprint = (id,iduser = null) => {
    console.log(id)
    return dispatch => {
        return CallApi(`sprint/viewListSprint/${id}`,
        'POST',
        {iduser:iduser}
        ).then (response =>{
            if(response.status === 201){
                dispatch(showlistsprint(response.data.listsprint));
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}
export const viewlistissuesinsprint = (idsprint, data) =>{
    return {
        type:'VIEW_LIST_ISSUES_IN_SPRINT',
        idsprint: idsprint,
        data: data
    }
}

export const ViewListIssueInSprint = (idproject, idsprint = null, iduser = null) => {
    console.log(idproject)
    return dispatch => {
        return CallApi(`sprint/viewListIssuesInSprint/${idproject}`,
        'POST',
        {
            idsprint: idsprint,
            iduser: iduser
        }
        ).then (response =>{
            if(response.status === 200){
                dispatch(viewlistissuesinsprint(idsprint,response.data.listissues));                
                
            }
            else {
                alert('1')
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            alert('2')
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}

export const addandsortissuesinsprint = (data) =>{
    return {
        type:'ADD_AND_SORT_ISSUES_IN_SPRINT',
        idsprintgive: data.idSprintGive,
        idsprinttake: data.idSprintTake,
        data: data.newData
    }
}
export const AddAndSortIssuesInSprint = (idSprintGive, idSprintTake, idIssues, listissues ) => {
    return dispatch => {
        return CallApi(`sprint/addAndSortIssuesInSprint/${idIssues}`,
        'PUT',
        {
            idsprintgive: idSprintGive,
            idsprinttake: idSprintTake,
            listissues: listissues
        }
        ).then (response =>{
            if(response.status === 200){
                let data = {idSprintGive: idSprintGive, idSprintTake: idSprintTake}
                dispatch(addandsortissuesinsprint(data));
                
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}
export const selectIssues = (issue) =>{
    return {
        type:'SELECT_ISSUES_IN_FILTER',
        data: issue
    }
}
export const SelectIssues = (idissues, ) =>{
    return dispatch =>{
        return CallApi(`issues/getInfoIssues/${idissues}`,'GET',{
        }).then (response =>{
            if(response.status === 200){
                
                dispatch(selectIssues(response.data.issues));
                
            }
            else {
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        })
        .catch(error =>{
            dispatch(Notification.ErrorAPI(error));
            setTimeout(() => {
                dispatch(Notification.hideNotification())
            }, 5000)
        })
    }
}