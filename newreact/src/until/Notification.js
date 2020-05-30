export const ErrorAPI = ( error ) => {
    return {
        type: 'ErrorAPI',
        error: error
    }
}
export const Error = ( data ) => {
    return {
        type: 'Error',
        message: data.message
    }
}
export const CreateSuccess = ( data ) => {
    debugger
    return {
        type: 'CreateSuccess',
        data: data.message
    }
}
export const hideNotification = (  ) => {
    return {
        type: 'HideNotification',
    }
}