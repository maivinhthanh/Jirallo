import { combineReducers } from 'redux'

import authReducer from './Core/auth';
import noteReducer from './Core/note';
import listprojectReducer from './ListProject/listproject'
import infouserReducer from './InfoUser/infouser'
import projectReducer from './Project/project'
import listIssuesReducer from './Project/listissues'
// import issueinbacklogReducer from './Project/issueinbacklog'
import listsprintReducer from './Project/listsprint'

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

