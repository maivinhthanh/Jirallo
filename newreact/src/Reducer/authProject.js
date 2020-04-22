const initialState = {
    hasAuth: false,
    position: ''
};

const updatestate = (state, action) =>{
    
    const newdata = {
        hasAuth: action.hasAuth,
        position: action.position.toLowerCase()
    }
   return newdata
}

const authProjectReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'AUTHORIZATION': return updatestate( state, action );
        
        default: return state;
    }
};

export default authProjectReducer;