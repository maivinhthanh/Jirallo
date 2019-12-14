import { updateObject,findUserLikeEmail } from '../utility';
import _ from 'lodash';
const initialState = {
    _id: '',
    activities: [],
    current: '',
    totalpages: 0
};

const getAll = (state, action) => {
    console.log(action.data)
    return action.data
}

const reducerActivities = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "GET_ALL_ACTIVITIES" : return getAll(state, action);
        default: return state;
    }
};

export default reducerActivities ;