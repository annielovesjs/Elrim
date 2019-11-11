import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from '../reducers/authReducer'
import streamsReducer from '../reducers/streamsReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer //add messages: 
})