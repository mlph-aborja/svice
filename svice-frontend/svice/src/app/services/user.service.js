import Axios from 'axios';

export const login = (params) => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/login';

	return Axios.post(url, params)
		.then(response => {
			if (response.data.access_token) {
				Axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${response.data.access_token}`;
			} else {
				delete Axios.defaults.headers.common['Authorization'];
			}
			return response.data;
		})
		.catch(error => {
			delete Axios.defaults.headers.common['Authorization'];
			return error.response.data;
		});
};

export const register = (params, role) => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/${role}/register`;

	return Axios.post(url, params)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const getAuthenticatedUserDetails = params => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/details';

	return Axios.get(url, params)
		.then(response => response.data)
		.catch(error => error.response.data);
};
