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
                console.log('loi roi')
                dispatch(Notification.Error(response.data))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
            }
        }).catch(err => {
            console.log(err)
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

export const ViewListIssueInSprint = (id) => {
    return dispatch => {
        return CallApi(`sprint/viewListIssuesInSprint/${id}`,
        'GET',
        {}
        ).then (response =>{
            if(response.status === 200){
                dispatch(viewlistissuesinsprint(id,response.data.listissues));
                
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
