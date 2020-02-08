import { combineReducers } from 'redux';
import alertBoxReducer from './alert-box.reducer';

export default combineReducers({
	alertBox: alertBoxReducer
});
