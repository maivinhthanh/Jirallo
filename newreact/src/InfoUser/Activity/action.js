import CallApi from '../../until/apiCaller'
import * as Notification from '../../until/Notification';


export const listActivities = (data) => {
    return {
        type: "GET_LIST",
        data
    }
}
export const getListActivities = (page) => {
    return dispatch => {
        return CallApi(`activities/getAllActivities/${page}`, 'GET').then(res => {
            dispatch(listActivities(res.data))
        }).catch(err => {
            dispatch(Notification.Error(err))
                setTimeout(() => {
                    dispatch(Notification.hideNotification())
                }, 5000)
        })
    }
}