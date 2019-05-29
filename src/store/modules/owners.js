import ownersService from './../../services/owners';

const state = {
    all: [],
    pageDetails: {
        total: 0,
        from: 0,
        to: 0,
        perPage: 0,
        currentPage: 0,
        lastPage: 0
    }
};

const getters = {
    /**
     * Returns all owners in the system
     *
     * @param {Object} state
     * @returns {Array}
     */
    getOwners(state) {
        return state.all;
    },

    /**
     * Gets owners page details
     *
     * @param {Object} state
     * @returns {Object}
     */
    getPageDetails (state) {
        return state.pageDetails;
    }
};

const mutations = {
    /**
     * Sets owners in state
     *
     * @param {Object} state
     * @param {Object} payload
     */
    ['SET_OWNERS'](state, payload) {
        if (payload.data) {
            state.all = payload.data;
            state.pageDetails = {
                total: payload.total,
                from: payload.from,
                to: payload.to,
                perPage: payload.per_page,
                currentPage: payload.current_page,
                lastPage: payload.last_page
            };
        } else {
            state.all = payload;
        }
    }
};

const actions = {
    /**
     * Gets owners
     *
     * @param {Object} param0
     * @param {Object} params
     * @param {Boolean} search
     * @returns {Object}
     */
    getOwners ({commit}, params, search = false) {
        return ownersService.index(params)
        .then(response => {
            if (!search) {
                commit('SET_OWNERS', response);
            }
            return Promise.resolve(response);
        })
    },

    show ({commit}, params) {
        return ownersService.show(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    /**
     * Searches for owner by keyword
     *
     * @param {Object} param0
     * @param {Object} params
     * @returns {Object}
     */
    search ({commit}, params) {
        return ownersService.search(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }
};

const namespaced = true;

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced
}