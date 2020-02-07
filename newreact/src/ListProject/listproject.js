const initialState = []
const listproject = (state, action) =>{
   return [...state, ...action.data ]
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GETALLLISTPROJECT': return listproject( state, action ); 
        
        default: return state;
    }
};

export default reducer;