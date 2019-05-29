import DashboardServices from './../../services/dashboard';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    /**
     * Gets general data
     *
     * @param {Object} param0
     * @param {Object} params
     */
    getGeneralData({commit}, params) {
        return DashboardServices.getGeneralData(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     * Gets crime data
     *
     * @param {Object} param0
     * @param {Object} params
     */
    getIncidentTypesData({commit}, params) {
        return DashboardServices.getIncidentTypesData(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     * Get recent incidents
     *
     * @param {Object} param0
     * @param {Object} params
     * @returns {Undefined}
     */
    getRecentIncidents({commit}, params) {
        return DashboardServices.getRecentIncidents(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     * Get incident rates over a range of dates
     *
     * @param {Object} param0
     * @param {Object} params
     * @returns {Undefined}
     */
    getIncidentRates({commit}, params) {
        return DashboardServices.getIncidentRates(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }
};

const namespaced = true;

export default {
    namespaced,
    getters,
    mutations,
    actions,
    state,
}