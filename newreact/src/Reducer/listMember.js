import _ from 'lodash'
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

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
    action.data.map((item, index) =>{
        let newdata = updateObject(item.id, {active: false})
        state = [...state, newdata]
    })
    
   return state
}

const listUserReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_LIST_USER_IN_PROJECT': return getListUserInProject( state, action ); 
        case 'CHANGE_ACTIVE': return changeActive( state, action ); 
        default: return state;
    }
};

export default listUserReducer;