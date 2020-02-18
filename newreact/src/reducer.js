import { combineReducers } from 'redux'

import authReducer from './Reducer/auth';
import noteReducer from './Reducer/note';
import listprojectReducer from './Reducer/listproject'
import infouserReducer from './Reducer/infouser'
import projectReducer from './Reducer/project'
import listIssuesReducer from './Reducer/listissues'
// import issueinbacklogReducer from './Project/issueinbacklog'
import listsprintReducer from './Reducer/listsprint'

export default combineReducers({
    auth: authReducer,
    note: noteReducer,
    listproject: listprojectReducer,
    infouser: infouserReducer,
    project: projectReducer,
    listissues: listIssuesReducer,
    listsprint: listsprintReducer,
    // issueinbacklog: issueinbacklogReducer
});

