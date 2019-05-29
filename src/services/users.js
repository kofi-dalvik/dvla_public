import { axios } from './index';

export default {
	/**
	 * Get all users.
	 *
	 * @param {Object} params
	 * @return {Object}
	 */
	all(params) {
		return axios.get('users', {
				params: params
			})
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	/**
	 * Store a new user.
	 *
	 * @param {Object} data
	 * @return {Object}
	 */
	store(data) {
		return axios.post('users', data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	/**
     * Get the specified user.
     *
	 * @param {Number} id
	 * @return {Object}
     */
	show(id) {
	    return axios.get(`users/${id}`)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	/**
	 * Update the specified user.
	 *
	 * @param {Number} id
	 * @param {Object} data
	 * @return {Object}
	 */
	update(id, data) {
		return axios.put(`users/${id}`, data)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	},

	/**
     * Delete the specified user.
     *
	 * @param {Number} id
	 * @return {Object}
     */
	delete(id) {
	    return axios.delete(`users/${id}`)
			.then(response => Promise.resolve(response.data))
			.catch(error => Promise.reject(error.response.data));
	}
}