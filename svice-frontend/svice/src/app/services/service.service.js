import Axios from 'axios';

export const findAllService = () => {
	const url = process.env.REACT_APP_API_ENDPOINT + '/admin/services';

	return Axios.get(url)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const findServiceById = id => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/admin/services/${id}`;

	return Axios.get(url)
		.then(response => response.data)
		.catch(error => error.response.data);
};

export const deleteService = id => {
	const url = process.env.REACT_APP_API_ENDPOINT + `/admin/services/${id}`;

	return Axios.delete(url);
};
