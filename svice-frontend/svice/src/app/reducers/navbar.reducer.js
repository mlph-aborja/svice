import { HIDE_NAVBAR } from '../actions/types';

const initialState = {
	hide: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case HIDE_NAVBAR:
			return {
				...state,
				hide: action.payload.hide
			};
		default:
			return state;
	}
};
