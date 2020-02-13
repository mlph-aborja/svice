import { AUTHENTICATE_USER, LOGOUT_USER } from './types';

export const authenticateUser = data => dispatch => {
	dispatch({
		type: AUTHENTICATE_USER,
		payload: {
			authenticated_user: data.user,
			access_token: data.access_token,
			roles: data.roles
		}
	});
};

export const logoutUser = () => dispatch => {
	dispatch({
		type: LOGOUT_USER
	});
};
