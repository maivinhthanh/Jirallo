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

const updatestate = (state, action) =>{
   return updateObject( state, {id : action.id, error:false},);
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ACTION': return updatestate( state, action ); 
        
        default: return state;
    }
};

export default reducer;