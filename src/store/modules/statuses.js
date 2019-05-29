import userStatusService from './../../services/statuses';
import { axios } from '../../services';

const state = {
    all: []
};

const getters = {
    /**
     * Get all user statuses
     *
     * @param {Object} state
     * @returns {Array}
     */
    getAll (state) {
        return state.all;
    }
};

const mutations = {
    /**
     * Sets user statuses
     *
     * @param {Object} state
     * @param {Object} payload
     */
    SET_STATUSES (state, payload) {
        state.all = payload;
    }
};

const actions = {
    /**
     * Gets user statuses from server
     *
     * @param {Object} param0
     * @param {Object} params
     */
    index ({commit}, params) {
        return userStatusService.index(params).then(response => {
            commit('SET_STATUSES', response)
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
};

const namespaced = true;

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced,
}