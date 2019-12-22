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
    
    let cloneState = _.clone(state)
    cloneState = [...action.data]
    state = cloneState
    return cloneState
}
const ChangeActive = (state, action) => {
    
    let clone = _.clone(state)
    if(!clone[action.index].active || clone[action.index].active === false){
      _.map(clone, (item, i)=>{
        item.active = false
      })
      clone[action.index].active = true

    }
    else if(clone[action.index].active === true){
        clone[action.index].active = false
    }

    return clone
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypesProject.getListUserInProjectSuccess: return getListUserInProjectSuccess(state, action)
        case actionTypesProject.ChangeActive: return ChangeActive(state, action)
        default: return state;
    }
};

export default reducer;