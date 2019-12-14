import * as Type from '../constants/error'

export function AlertError(err){
    return {
        type: Type.errorToken,
        message: err.response.data.message
    }
}
export function CancelError(err){
    return {
        type: Type.errorToken,
        message: ''
    }
}

// export default {
//     AlertError: AlertError,
//     CancelError: CancelError
// }