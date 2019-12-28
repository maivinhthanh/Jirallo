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
    let cloneState = _.cloneDeep(state)
    if(action.data.listissues.length === 0){
        cloneState = [...cloneState,{
            id: action.id,
            listissues: [{
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
            }]
        }]
    }
    else{
        cloneState = [...cloneState,{
            id: action.id,
            listissues: action.data.listissues
        }]
    }
    
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