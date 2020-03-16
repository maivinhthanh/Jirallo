const initialState = []
const listproject = (state, action) =>{
   return [ ...action.data ]
}
const updateList = (state, action) => {
    let cloneState = [...state]
    cloneState.push(action.data)
    return cloneState
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GETALLLISTPROJECT': return listproject( state, action ); 
        case ('SAVELISTPROJECT') : return updateList(state, action);

        
        default: return state;
    }
};

export default reducer;