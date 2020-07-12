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

const FindUserAction = (state, action) => {
    let listAuth = _.clone(state)
    listAuth = _.clone(action.data)
    return listAuth
}
const listUserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_LIST_USER_IN_PROJECT': return getListUserInProject( state, action ); 
        case 'CHANGE_ACTIVE': return changeActive( state, action ); 
        // case 'FIND_USER_LIKE_EMAIL': return FindUserAction(state, action)

        default: return state;
    }
};

export default listUserReducer;