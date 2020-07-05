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
    return {
        type: 'CreateSuccess',
        message: data.message
    }
}
export const hideNotification = (  ) => {
    return {
        type: 'HideNotification',
    }
}