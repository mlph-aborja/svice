import { HIDE_NAVBAR } from './types';

const hideNavbar = hide => dispatch => {
	dispatch({
		type: HIDE_NAVBAR,
		payload: {
			hide: hide
		}
	});
};

export default hideNavbar;
