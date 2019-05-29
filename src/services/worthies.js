import { axios } from './index';

export default {
    /**
     * Creates a new vehicle insurance
     *
     * @param {Object} data
     * @returns {Object}
     */
    create(data) {
        return axios.post('road_worthies', data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },

    /**
     * Gets the insurance
     *
     * @param {Object} params
     * @returns {Object}
     */
    index(params) {
        return axios.get('road_worthies', { params })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },
}