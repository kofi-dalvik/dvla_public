import { axios } from './index';

export default {
    /**
     * Gets general data
     *
     * @param {Object} params
     * @param {Object}
     */
    getGeneralData(params) {
        return axios.get('/dashboards/general', {
                params
            })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },

    /**
     * Gets crime rate data
     *
     * @param {Object} params
     * @returns {Object}
     */
    getIncidentTypesData(params) {
        return axios.get('/dashboards/incidents/types', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     * Gets recent incidents
     *
     * @param {Object} params
     * @returns {Object}
     */
    getRecentIncidents(params) {
        return axios.get('/dashboards/incidents/recent', { params })
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error.response.data));
    },

    /**
     * Gets incident rates by incident types
     *
     * @param {Object} params
     * @returns {Undefined}
     */
    getIncidentRates(params) {
        return axios.get('/dashboards/incidents/rates', { params })
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error.response.data));
    },
}