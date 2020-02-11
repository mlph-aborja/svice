import { SHOW_ALERT_BOX } from './types';

export const showAlert = (show, success, message) => dispatch => {
	dispatch({
		type: SHOW_ALERT_BOX,
		payload: {
			show: show,
			success: success,
			message: message
		}
	});
};
