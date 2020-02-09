import { SHOW_ALERT_BOX } from '../actions/types';

const initialState = {
	show: false,
	success: false,
	message: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SHOW_ALERT_BOX:
			const payload = action.payload;
			return {
				...state,
				show: payload.show,
				success: payload.success,
				message: payload.message
			};
		default:
			return state;
	}
}
