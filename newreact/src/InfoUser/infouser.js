const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    name: '',
    image: '',
    birthdate: '',
    gender: '',

};

const changeinfouser = (state, action) =>{
   return updateObject( state, action.data);
}

const getinfouser = (state, action) =>{
    return updateObject( state, action.data);
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'CHANGE_INFO_USER': return changeinfouser( state, action ); 
        case 'GET_INFO_USER': return getinfouser( state, action ); 
        default: return state;
    }
};

export default reducer;