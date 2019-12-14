import * as actionTypes from '../constants/project';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = {
    id: '',
    name: '',
    key: '',
    description: '',
    image: '',
    idmembers : [],
    idepic : [],
    idsprint: '',
    idissues : [],
    datecreate: '',
    hidden: false,
    error: false
};

const createProject = ( state, action ) => {
  let cloneState = [...state]
  cloneState.push(action.result)
  return cloneState
//  return updateObject( state, action.result );
};
const getAllList = (state, action) => {
    let cloneState = _.clone(state)
    cloneState = [...action.data]
    console.log('adsd',cloneState)
    return cloneState
    // return updateObject(state, action.data)
}
const addSuccess = (state, action) => {
    state[0].idmembers = [...action.data.project.idmembers]
    return state
}
const getInfoSuccess = (state, action) => {
    let cloneState = _.clone(state)
    let array = []
    cloneState = {...action.data.project}
    array.push(cloneState)
    return array
}
const findProjectSuccess = (state, action) => {
    console.log(state, action.data)
    let cloneState = _.cloneDeep(state)
    cloneState = [action.data]
    console.log(cloneState)
    return cloneState
}


const projectError = (state, action) => {
    return updateObject(state, {error: true})
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.createProject: return createProject( state, action )
        case actionTypes.getAllList : return getAllList(state, action)
        case actionTypes.addSuccess : return addSuccess(state, action)
        case actionTypes.projectError : return projectError(state, action)
        case actionTypes.getInfoSuccess: return getInfoSuccess(state, action);
        case actionTypes.findProjectSuccess: return findProjectSuccess(state, action)

        default: return state;
    }
};

export default reducer;