import { combineReducers } from 'redux'

import authReducer from './Core/auth';
import noteReducer from './Core/note';
import listprojectReducer from './ListProject/listproject'
import infouserReducer from './InfoUser/infouser'

export default combineReducers({
    auth: authReducer,
    note: noteReducer,
    listproject: listprojectReducer,
    infouser: infouserReducer
});

