import {
    axios
} from './index';

const api = {
    show: 'incidents',
    store: 'incidents',
    index: 'incidents',
    update: 'incidents',
    delete: 'incidents',
    vehicles: 'incidents/vehicles',
    types: 'incident_types',
    createUpdate: 'incident_updates'
};

export default {
    /**
     * Stores incident
     *
     * @param {Object} data
     * @returns {Object}
     */
    store(data) {
        return axios.post(api.store, data)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },


    /**
     * Gets list of incidents
     *
     * @param {Object} params
     * @returns {Object}
     */
    index(params) {
        return axios.get(api.index, { params })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    },

    getVehicles (params) {
        return axios.get(api.vehicles, { params }).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    /**
     * Shows a incident
     *
     * @param {Number} params
     * @returns {Object}
     */
    show(params) {
        return axios.get(`${api.show}/${params}`).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Updates incident
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
     * Get the various incident types
     *
     * @param {Object} params
     * @returns {Object}
     */
    getTypes (params) {
        return axios.get(api.types).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    },

    /**
     * Creates incident update
     *
     * @param {Object} data
     * @returns {Object}
     */
    createUpdate (data) {
        return axios.post(api.createUpdate, data).then(response => {
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error.response.data);
        });
    }
}