const initialState = []
const listproject = (state, action) =>{
   return [ ...action.data ]
}
const updateList = (state, action) => {
    let cloneState = [...state]
    cloneState.push(action.data)
    return cloneState
}
const getListSearch = (state, action) => {
    let cloneState = []
    cloneState.push(action.data)
    return cloneState
}

const getProjectLikeName = (state, action) => {
    return [ ...action.data.project ]
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GETALLLISTPROJECT': return listproject( state, action ); 
        case ('SAVELISTPROJECT') : return updateList(state, action);
        case 'searchSuccess' : return getListSearch(state, action);
        case 'GET_PROJECT_LIKE_NAME': return getProjectLikeName(state, action)

        
        default: return state;
    }
};

export default reducer;