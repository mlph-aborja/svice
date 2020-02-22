import Axios from 'axios';

export const login = (params, role) => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/login';

	params['role'] = role;

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

export const findAllAdmin = params => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/admin/admins';

	return Axios.get(url, params)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const findAllCustomer = () => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/admin/customers';

	return Axios.get(url)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const findUserById = id => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/admin/users/${id}`;

	return Axios.get(url)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const deleteUser = id => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/admin/users/${id}`;

	return Axios.delete(url);
};

export const updateUser = (params, id) => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/admin/users/${id}`;

	return Axios.put(url, params)
		.then(response => response.data)
		.catch(error => error.response.data);
};
