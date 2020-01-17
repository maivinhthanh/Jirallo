import { combineReducers } from 'redux'

import authReducer from './Core/auth';
import noteReducer from './Core/note';

export default combineReducers({
    auth: authReducer,
    note: noteReducer
});

