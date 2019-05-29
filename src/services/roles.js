import { axios } from './index';

export default {
	/**
	 * Get all roles
	 *
	 * @param {Object} params
	 * @return {Object}
	 */
    all(params) {
        return axios.get('roles', {
            params: params
        })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },

	/**
	 * Store a new role
	 *
	 * @param {Object} data
	 * @return {Object}
	 */
    store(data) {
        return axios.post('roles', data)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },

	/**
     * Get the specified role
     *
	 * @param {Number} id
	 * @return {Object}
     */
    show(id) {
        return axios.get(`roles/${id}`)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },

	/**
	 * Update the specified role
	 *
	 * @param {Number} id
	 * @param {Object} data
	 * @return {Object}
	 */
    update(id, data) {
        return axios.put(`roles/${id}`, data)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },

	/**
     * Delete the specified role
     *
	 * @param {Number} id
	 * @return {Object}
     */
    delete(id) {
        return axios.delete(`roles/${id}`)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    }
}