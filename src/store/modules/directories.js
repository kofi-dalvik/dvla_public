import directoryService from './../../services/directories';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    /**
     * Searches for vehicles or owners by keyword
     *
     * @param {Object} param0
     * @param {Object} params
     */
    index ({commit}, params) {
        return directoryService.index(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     *
     * @param {Object} param0
     * @param {Object} params
     * @returns {Object}
     */
    getVehicle ({commit}, params) {
        return directoryService.getVehicle(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     *
     * @param {Object} param0
     * @param {Object} params
     * @returns {Object}
     */
    getOwner ({commit}, params) {
        return directoryService.getOwner(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }
};

const namespaced = true;

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced
}