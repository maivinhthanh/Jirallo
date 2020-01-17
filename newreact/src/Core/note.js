const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    
    show: false,
    message: '',
    type: ''
    
};
const ErrorAPI = (state, action) => {
    return updateObject( state, { 
        show: true,
        message: 'Lỗi hệ thống',
        type: 'error'
    } );
};
const ErrorToast = (state, action) => {
    console.log('vào đây')
    return updateObject( state, { 
        show: true,
        message: action.message,
        type: 'error'
    } );
};
const WarningToast = (state, action) => {
    return updateObject( state, { 
        show: true,
        message: action.message,
        type: 'warning'
    } );
};
const SuccessToast = (state, action) => {
    return updateObject( state, { 
        show: true,
        message: action.message,
        type: 'success'
    } );
};
const HideNotification = (state, action) => {
    return updateObject( state, { 
        show: false,
        
    } );
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ErrorAPI': return ErrorAPI( state, action );
        case 'Warning': return WarningToast(state, action)
        case 'Error': return ErrorToast(state, action)
        case 'CreateSuccess' : return SuccessToast(state,action)
        case 'HideNotification': return HideNotification(state, action)

        default: return state;
    }
};

export default reducer;