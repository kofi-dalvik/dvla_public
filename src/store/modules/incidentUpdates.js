import incidentUpdatesService from './../../services/incidentUpdates';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    /**
     * Gets incident update for given incident
     *
     * @param {Object} param0
     * @param {Object} params
     */
    index({ commit }, params) {
        return incidentUpdatesService.index(params).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            Promise.reject(error);
        });
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