import {
    axios
} from './index';

const api = {
    create: 'insurances',
    index: 'insurances',
    delete: 'insurances',
    search: 'insurances',
    update: 'insurances',
};

export default {
    /**
     * Creates a new vehicle insurance
     *
     * @param {Object} data
     * @returns {Object}
     */
    create(data) {
        return axios.post(api.create, data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },

    /**
     * Get insurances expriing in this week
     *
     * @param {Object} params
     */
    getInsurancesExpiring(params) {
        return axios.get('/dashboards/insurances/expiring', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     * Updates insurance
     *
     * @param {Number} id
     * @param {Object} data
     */
    update(id, data) {
        return axios.put(`${api.update}/${id}`, data)
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
        return axios.get(api.index, {
                params
            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },


    /**
     * Searches for insurance
     *
     * @param {String} keyword
     * @returns {Object}
     */
    search(keyword) {
        return axios.get(api.search + `?q=${keyword}`)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },


    /**
     * Deletes a given insurance
     *
     * @param {Object} params
     * @return {Object}
     */
    destroy(params) {
        return axios.delete(api.delete + `/${params.id}`)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    }
}