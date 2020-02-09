import { reactLocalStorage } from 'reactjs-localstorage';

export default class AuthUtil {
	static setAuthenticatedUser(data) {
		// delete data.user.roles;
		reactLocalStorage.setObject('user', data.user);
		reactLocalStorage.setObject('roles', data.roles);
		reactLocalStorage.set('access_token', data.access_token);
	}

	static destroyAuthenticatedUser() {
		reactLocalStorage.remove('user');
		reactLocalStorage.remove('access_token');
		reactLocalStorage.remove('roles');
	}

	static getAccessToken() {
		return reactLocalStorage.get('access_token');
	}

	static getAuthenticatedUser() {
		return reactLocalStorage.getObject('user');
	}

	static getAuthenticatedUserRoles() {
		return reactLocalStorage.getObject('roles');
	}

	static isAuthenticated() {
		return AuthUtil.getAccessToken() && AuthUtil.getAuthenticatedUser();
	}
}
