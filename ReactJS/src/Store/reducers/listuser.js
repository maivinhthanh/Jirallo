import * as actionTypesProject from '../constants/project';
import { updateObject } from '../utility';
import _ from 'lodash';

const initialState = [{id: {avatar: null,
    birthdate: "",
    email: "",
    gender: "",
    hidden: false,
    image: "",
    name: "",
    _id: ""},
    position: "Manager"}];
const getListUserInProjectSuccess = (state, action) => {
    console.log(action)
    let cloneState = _.clone(state)
    cloneState = [...action.data]
    return cloneState
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypesProject.getListUserInProjectSuccess: return getListUserInProjectSuccess(state, action)
        default: return state;
    }
};

export default reducer;