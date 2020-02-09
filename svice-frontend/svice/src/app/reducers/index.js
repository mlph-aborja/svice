import { combineReducers } from 'redux';
import alertBoxReducer from './alert-box.reducer';
import authReducer from './auth.reducer';
import navbarReducer from './navbar.reducer';

export default combineReducers({
	alertBox: alertBoxReducer,
	auth: authReducer,
	navbar: navbarReducer
});
