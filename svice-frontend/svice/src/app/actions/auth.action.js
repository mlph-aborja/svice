import { AUTHENTICATE_USER, LOGOUT_USER } from './types';

export const authenticateUser = (user, access_token) => dispatch => {
	dispatch({
		type: AUTHENTICATE_USER,
		payload: {
			authenticated_user: user,
			access_token: access_token
		}
	});
};

export const logoutUser = () => dispatch => {
	dispatch({
		type: LOGOUT_USER
	});
};
