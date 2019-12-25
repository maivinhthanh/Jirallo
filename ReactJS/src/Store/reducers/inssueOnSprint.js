import * as actionTypes from '../constants/sprint';
import { updateObject } from '../utility';
import _ from 'lodash';
const initialState = [{
    idsprint: '',
    listissues: [
        {
            comment: [],
            name: '',
            email: '',
            password: '',
            image:'',
            priority:'',
            process:'',
            datecreate:'',
            repoter:'',
            // idgroup:'',
            error: false,
            hidden: false,
            type:'',
            idissues:'',
            _id: ''
        }
    ]
    
}];
export const ViewListIssue = (state, action) => {
    console.log(state, action)
    let cloneState = _.cloneDeep(state)
    cloneState = [...cloneState,{
        id: action.id,
        listissues: action.data.listissues
    }]
    console.log(cloneState)
    // cloneState = _.cloneDeep(action.data.listissues)
    return cloneState
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ViewListIssue: return ViewListIssue(state, action)
        default: return state;
    }
};

export default reducer ;