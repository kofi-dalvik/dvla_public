import insuranceService from '@/services/insuranceTypes.js';

const state = {
    all: [],
};

const getters = {
    getAll(state) {
        return state.all
    }
};

const mutations = {
    /**
     * Replaces the types with given array
     *
     * @param {Object} state
     * @param {Array} payload
     */
    ['SET_TYPES'](state, payload) {
        if (payload.data) {
            state.all = payload.data;
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
    ['ADD_TYPE'](state, payload) {
        state.all.unshift(payload);
    },


    /**
     * Removes a given type from state
     *
     * @param {Object} state
     * @param {Number} id
     */
    ['REMOVE_TYPE'](state, id) {
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
         return insuranceService.index(params)
             .then(response => {
                 commit('SET_TYPES', response);
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
        return insuranceService.create(type)
            .then(response => {
                commit('ADD_TYPE', response);
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
    update({ commit }, { id, data }) {
        return insuranceService.update(id, data).then(response => {
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
        return insuranceService.search(keyword)
            .then(response => {
                commit('SET_TYPES', response);
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
        return insuranceService.destroy(params)
            .then(response => {
                commit('REMOVE_TYPE', params.id);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            })
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