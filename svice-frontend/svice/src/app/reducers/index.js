import { combineReducers } from 'redux';
import alertBoxReducer from './alert-box.reducer';
import authReducer from './auth.reducer';

export default combineReducers({
	alertBox: alertBoxReducer,
	auth: authReducer
});
