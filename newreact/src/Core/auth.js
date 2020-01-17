import Cookies from 'js-cookie'
import CallApi from '../until/apiCaller';

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    id: null,
    email: null,
    password: null,
    gender: null,
    name: {
        firstname: null,
        lastname: null,
        fullname: null
    },
    image: null,
    birthdate: null,
    hasAuth: false
    
};

const login = ( state, action ) => {
    console.log("ko biết có vào đây ko?")
    const token = action.token
    const refreshtoken = action.refreshtoken
    Cookies.set('token', token, { expires: 365 });
    Cookies.set('refreshtoken', refreshtoken, { expires: 365 });
    CallApi('auth/getMyInfo', 'GET',{},'token')
    .then( response => {
        localStorage.setItem('user', JSON.stringify(response.data.result));
     } )
     .catch(error => {
        console.log(error)
     } );
    return updateObject( state, {hasAuth : true} );
};

const register = (state, action) =>{
   return updateObject( state, {id : action.id, error:false},);
}

const EditUserSuccess = (state, action) =>{
    return updateObject(state, {result : action.result})
}

const LogOut = (state, action) =>{
    return updateObject(state,{error : true})
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'Login': return login( state, action ); 
        case 'Register' : return register(state,action);
        case 'EditUserSuccess' : return EditUserSuccess(state, action);
        case 'LogOut' : return LogOut(state,action)

        default: return state;
    }
};

export default reducer;