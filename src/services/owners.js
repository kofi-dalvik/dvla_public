import { axios } from './index';


const api = {
    index: 'owners',
    search: 'owners/search'
};

export default {
    /**
     * Gets vehicle owners
     *
     * @param {Object} params
     * @return {Object}
     */
    index(params) {
        return axios.get(api.search, { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     * Shows an owner
     *
     * @param {Object} params
     * @returns {Object}
     */
    show (params) {
        return axios.get(`${api.index}/${params}`)
        .then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Searches for owners by keyword
     *
     * @param {Object} params
     * @returns {Object}
     */
    search (params) {
        return axios.get(api.search, { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    }
}