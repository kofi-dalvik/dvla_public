import { axios } from './index';

export default {
    /**
     * Searches for vehicle and owners by keywords
     *
     * @param {Object} params
     * @returns {Undefined}
     */
    index (params) {
        return axios.get('directories', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     *
     * @param {Object} params
     * @returns {Object}
     */
    getVehicle (params) {
        return axios.get('directories/vehicles/' + params.id, { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     *
     * @param {Object} params
     * @returns {Object}
     */
    getOwner (params) {
        return axios.get('directories/owners/' + params.id, { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    }
}