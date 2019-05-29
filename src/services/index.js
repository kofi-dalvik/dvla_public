import Axios from 'axios';
import store from '../store';
import router from '../router';
import Config from '../../config';

export const axios = Axios.create({
	baseURL: Config[process.env.NODE_ENV].baseURL,

	headers: {
		'X-Requested-With': 'XMLHttpRequest',
	}
});

// Intercept each request and set the bearer token for user
axios.interceptors.request.use((config) => {
	// store.dispatch('showLoader');

	let apiToken = store.getters['Auth/getUser'].api_token;

	if (apiToken && !config.headers.common.Authorization) {
		config.headers.common.Authorization = `Bearer ${apiToken}`;
	}

	NProgress.start();

	return config;
});

// Logout user when the api token is not working (expired or being refreshed)
axios.interceptors.response.use((response) => {
	// store.dispatch('hideLoader');
	NProgress.done();
	return response;
}, (error) => {
	NProgress.done();

	if (error.response.status === 401) {
		store.dispatch('Auth/logout');
		router.push('login');
	}

	// store.dispatch('hideLoader');

	return Promise.reject(error);
});