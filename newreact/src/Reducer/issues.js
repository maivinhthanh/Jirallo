const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    _id: null,
    name: null,
    repoter: {
        image: null,
        name: null,
        _id: null
    },
    assignee: {
        image: null,
        name: null,
        _id: null
    },
    process: 'todo',
    type: 'task',
    priority: 'medium',
    descript: '',
    image: [],
    comment: [{
        author: {
            image: null,
            name: null,
            _id: null
        },
        content: null,
        image:[]
    }],
    watch: []
};

const changeProcessIssue = (state, action) =>{
    return updateObject(state,action.data )
}
const selectIssuesInFilter = (state, action) =>{
    return updateObject(state,action.data )
}
const issuesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'CHANGE_PROCESS_ISSUE': return changeProcessIssue( state, action ); 
        case 'SELECT_ISSUES_IN_FILTER': return selectIssuesInFilter( state, action ); 
        
        default: return state;
    }
};

export default issuesReducer;