import CallApi from '../until/apiCaller';
import _ from 'lodash'

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
    hasAuth: false,
    idtoken: null
};

const login = ( state, action ) => {
    const token = action.token
    localStorage && localStorage.setItem('token', token);
    CallApi('auth/getMyInfo', 'GET',{},'token')
    .then( response => {
        localStorage.setItem('user', JSON.stringify(response.data.result));
     } )
     .catch(error => {
     } );
    return updateObject( state, {hasAuth : true, idtoken: token} );
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

const getListUserInProject = (state, action) => {
    let cloneState = _.clone(state)
    cloneState = _.clone(action.data)
    return cloneState
}

const FindUserAction = (state, action) => {
    let listAuth = _.clone(state)
    listAuth = _.clone(action.data)
    return listAuth
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'Login': return login( state, action ); 
        case 'Register' : return register(state,action);
        case 'EditUserSuccess' : return EditUserSuccess(state, action);
        case 'LogOut' : return LogOut(state,action)
        case 'FIND_USER_LIKE_EMAIL': return FindUserAction(state, action);
        // case 'GET_LIST_USER_IN_PROJECT' : return getListUserInProject(state,action)

        default: return state;
    }
};

export default reducer;