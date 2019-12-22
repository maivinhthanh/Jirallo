import { combineReducers } from 'redux'

import authReducer from './auth';
import adminReducer from './admin';
import listissuesReducer from './listissues';
import projectReducer from './project'
import userReducer from './user';
import groupReducer from './group';
import epicReducer from './epic';
import issueReducer from './issues';
import sprintReducer from './sprint'
import memberReducer from './member'
import listuserReducer from './listuser'
import errorReducer from './error'
import activitiesReducer from './activities'
import IssueOnSprintReducer from './inssueOnSprint'
export default combineReducers({
    auth: authReducer,
    admin: adminReducer,
    project : projectReducer,
    group: groupReducer,
    user: userReducer,
    epic : epicReducer,
    issue: issueReducer,
    sprint: sprintReducer,
    member: memberReducer,
    listissues: listissuesReducer,
    listuser: listuserReducer,
    activities: activitiesReducer,
    error: errorReducer,
    issueOnSprint: IssueOnSprintReducer
});

