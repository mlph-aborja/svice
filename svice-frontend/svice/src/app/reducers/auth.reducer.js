import { AUTHENTICATE_USER, LOGOUT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
	authenticated_user: {},
	access_token: '',
	isAuthenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE_USER:
			const payload = action.payload;
			return {
				...state,
				authenticated_user: payload.authenticated_user,
				access_token: payload.access_token,
				isAuthenticated: !isEmpty(
					payload.authenticated_user,
					payload.access_token
				)
			};
		case LOGOUT_USER:
			return {
				...state,
				authenticated_user: {},
				access_token: '',
				isAuthenticated: false
			};
		default:
			return state;
	}
};
