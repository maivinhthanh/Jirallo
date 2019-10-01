import * as actionTypes from '../constants/project';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = {
    id: '',
    name: '',
    key: '',
    description: '',
    image: '',
    idmembers : '',
    idepic : '',
    idsprint: '',
    idissues : '',
};

const createProject = ( state, action ) => {
  console.log(action)
 return updateObject( state, {action : action} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.createProject: return createProject( state, action ); 
        default: return state;
    }
};

export default reducer;