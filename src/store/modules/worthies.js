import worthiesService from '@/services/worthies.js';

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
    getAll(state) {
        return state.all
    },

    getPageDetails(state) {
        return state.pageDetails;
    }
};

const mutations = {
    /**
     * Replaces the types with given array
     *
     * @param {Object} state
     * @param {Array} payload
     */
    ['SET_WORTHIES'](state, payload) {
        // return console.log(payload)
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
    },


    /**
     * Adds a created type
     *
     * @param {Object} state
     * @param {Object} payload
     */
    ['ADD_WORTHIES'](state, payload) {
        state.all.unshift(payload);
    },


    /**
     * Removes a given type from state
     *
     * @param {Object} state
     * @param {Number} id
     */
    ['REMOVE_WORTHIES'](state, id) {
        state.all.forEach((type, index) => {
            if (type.id == id) {
                state.all.splice(index, 1);
                return;
            }
        });
    }
};

const actions = {
    /**
     * Gets all types
     *
     * @param {Object} param0
     * @param {Object} params
     */
    index({ commit }, params) {
        return worthiesService.index(params)
            .then(response => {
                commit('SET_WORTHIES', response);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },

    /**
     * Creates a new type
     *
     * @param {Object} param0
     * @param {Object} type
     */
    create({ commit }, type) {
        return worthiesService.create(type)
            .then(response => {
                commit('ADD_WORTHIES', response);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            })
    },

    /**
     * Updates a given type
     *
     * @param {Object} param0
     * @param {Object} param1
     */
    update({ commit }, { id, data}) {
        return worthiesService.update(id, data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },


    /**
     * Search for types
     *
     * @param {Object} param0
     * @param {Object} keyword
     */
    search({ commit }, keyword) {
        return worthiesService.search(keyword)
            .then(response => {
                commit('SET_WORTHIES', response);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },

    /**
     * Deletes the given type
     *
     * @param {Object} param0
     * @param {Object} params
     */
    destroy({ commit }, params) {
        return worthiesService.destroy(params)
            .then(response => {
                commit('REMOVE_WORTHIES', params.id);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            })
    },

    getworthiesExpiring({commit}, params) {
        return worthiesService.getWORTHIESsExpiring(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    }
};

const namespaced = true;


export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}