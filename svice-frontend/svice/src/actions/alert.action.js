import { SHOW_ALERT } from './types';

export const showAlert = (show, success, message) => dispatch => {
	dispatch({
		type: SHOW_ALERT,
		payload: {
			show: show,
			success: success,
			message: message
		}
	});
};
