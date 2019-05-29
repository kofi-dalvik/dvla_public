import CountriesService from '../../services/countries';

const state = {
    all: []
};

const getters = {
    /**
     * Get all countries from the state.
     *
     * @param  {Object} state
     * @return {String}
     */
    getAll(state) {
        return state.all;
    }
};

const mutations = {
    ['SET_COUNTRIES'](state, payload) {
        state.all = payload;
    },
};

const actions = {
    /**
     * Get all countries
     *
     * @param  {Object} options.commit
     * @param  {Object} query
     * @return {Object}
     */
    all({
        commit
    }, query) {
        return CountriesService.all(query)
            .then((response) => {
                commit('SET_COUNTRIES', response);
                return Promise.resolve(response);
            })
            .catch((error) => Promise.reject(error));
    },
};

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    getters,
    mutations
};