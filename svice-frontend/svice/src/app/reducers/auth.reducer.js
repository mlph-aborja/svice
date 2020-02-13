import { AUTHENTICATE_USER, LOGOUT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import Axios from 'axios';

const initialState = {
	authenticated_user: {},
	access_token: '',
	roles: [],
	isAuthenticated: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE_USER:
			const payload = action.payload;
			Axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${payload.access_token}`;
			return {
				...state,
				authenticated_user: payload.authenticated_user,
				access_token: payload.access_token,
				isAuthenticated: !isEmpty(
					payload.authenticated_user,
					payload.access_token
				),
				roles: payload.roles
			};
		case LOGOUT_USER:
			return {
				...state,
				authenticated_user: {},
				access_token: '',
				isAuthenticated: false,
				roles: []
			};
		default:
			return state;
	}
};
