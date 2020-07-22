import _ from 'lodash'

const initialState = {
    activities: [
        {
        action: '',
        datecreate: '',
        hidden: false,
        iduser: '',
        _id: ''
        }
    ],
    current: '1',
    totalpages: '1'
}
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
const getListActivities = (state, action) => {
    return updateObject( state, action.data);
}

const ActivityReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_LIST': return getListActivities(state, action)
        default: return state
    }
}
export default ActivityReducer