import { reactLocalStorage } from 'reactjs-localstorage';

class AuthUtil {
	static setAuthenticatedUser(data) {
		reactLocalStorage.setObject('user', data.user);
		reactLocalStorage.set('access_token', data.access_token);
	}

	static destroyAuthenticatedUser() {
		reactLocalStorage.remove('user');
		reactLocalStorage.remove('access_token');
	}

	static getAccessToken() {
		return reactLocalStorage.get('access_token');
	}

	static getAuthenticatedUser() {
		return reactLocalStorage.getObject('user');
	}
}

export default AuthUtil;
