import { axios } from './index';

const api = {
    store: 'vehicles',
    index: 'vehicles',
    show: 'vehicles',
    update: 'vehicles',
    delete: 'vehicles',
    changeOwnerShip: 'vehicles/ownership'
};

export default {
    /**
     * Stores vehicle
     *
     * @param {Object} data
     * @returns {Object}
     */
    store (data) {
        return axios.post(api.store, data)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },


    /**
     * Gets list of vehicles
     *
     * @param {Object} params
     * @returns {Object}
     */
    index (params) {
        return axios.get(api.index, { params })
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Shows a vehicle
     *
     * @param {Number} params
     * @returns {Object}
     */
    show (params) {
        return axios.get(`${api.show}/${params}`).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Updates vehicle
     *
     * @param {Number} id
     * @param {Object} data
     */
    update(id, data) {
        return axios.put(`${api.update}/${id}`, data).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Changes ownership of vehicle
     *
     * @param {Object} params
     * @returns {Object}
     */
    changeOwnerShip(params) {
        return axios.post(api.changeOwnerShip, params).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Changes ownership of vehicle to an existing owner
     *
     * @param {Object} params
     * @returns {Object}
     */
    changeExistingOwnership(params) {
        return axios.post(`${api.changeOwnerShip}/existing`, params)
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    getTransferLetter(params) {
        return axios.get('vehicles/transfer_letter', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    getPrintData(params) {
        return axios.get('vehicles/print', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    }
}