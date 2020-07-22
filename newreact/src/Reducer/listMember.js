import _ from 'lodash'

const initialState = []

const changeActive = (state, action) =>{
    if(action.status === true){
        _.map(state, (item, index) =>{
            item.active = false
        })
    }
    else{
        _.map(state, (item, index) =>{
            item.active = false
        })
        state[action.index].active = true
    }
    return state
}

const getListUserInProject = (state, action) =>{
    let cloneState = _.clone(state)
    cloneState = _.clone(action.data)
   return cloneState
}

const editPermission = (state, action ) => {
    // return [...action.data.newUser]
    return state
}
const listUserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_LIST_USER_IN_PROJECT': return getListUserInProject( state, action ); 
        case 'CHANGE_ACTIVE': return changeActive( state, action ); 
        case 'EDIT_PERMISSION_SUCCESS': return editPermission(state, action)

        default: return state;
    }
};

export default listUserReducer;