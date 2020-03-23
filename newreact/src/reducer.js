import { combineReducers } from 'redux'

import authReducer from './Reducer/auth';
import noteReducer from './Reducer/note';
import listprojectReducer from './Reducer/listproject'
import infouserReducer from './Reducer/infouser'
import projectReducer from './Reducer/project'
import listIssuesReducer from './Reducer/listissues'
import listMemberReducer from './Reducer/listMember'
import listsprintReducer from './Reducer/listsprint'
import issuesReducer from './Reducer/issues'
import reportReducer from './Reducer/report'

export default combineReducers({
    auth: authReducer,
    note: noteReducer,
    listproject: listprojectReducer,
    infouser: infouserReducer,
    project: projectReducer,
    listissues: listIssuesReducer,
    listsprint: listsprintReducer,
    listMember: listMemberReducer,
    issues: issuesReducer,
    report: reportReducer
});

