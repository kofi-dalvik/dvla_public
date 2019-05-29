import makesService from '@/services/makes.js';
import {
    ADD_MAKE,
    SET_MAKES,
    CREATE_MAKE,
    REMOVE_MAKE
} from './../mutation-types';

const state = {
    all: []
};

const getters = {
    getMakes (state) {
        return state.all
    }
};

const mutations = {
    /**
     * Replaces the makes with given array
     *
     * @param {Object} state
     * @param {Array} payload
     */
    [SET_MAKES] (state, payload) {
        state.all = payload;
    },


    /**
     * Adds a created make
     *
     * @param {Object} state
     * @param {Object} payload
     */
    [ADD_MAKE] (state, payload) {
        state.all.unshift(payload);
    },


    /**
     * Removes a given make from state
     *
     * @param {Object} state
     * @param {Number} id
     */
    [REMOVE_MAKE] (state, id) {
        state.all.forEach((make, index) => {
            if (make.id == id) {
                state.all.splice(index, 1);
                return;
            }
        });
    }
};

const actions = {
    /**
     * Creates a new make
     *
     * @param {Object} param0
     * @param {Object} make
     */
    createMake ({commit}, make) {
        return makesService.create(make)
        .then(response => {
            commit(ADD_MAKE, response);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        })
    },

    /**
     * Updates a given make
     *
     * @param {Object} param0
     * @param {Object} param1
     */
    update({commit}, {id, data}) {
        return makesService.update(id, data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Gets all makes
     *
     * @param {Object} param0
     * @param {Object} params
     */
    getMakes ({commit}, params) {
        return makesService.index(params)
        .then(response => {
            commit(SET_MAKES, response);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error)
        })
    },


    /**
     * Search for makes
     *
     * @param {Object} param0
     * @param {Object} keyword
     */
    search ({commit}, keyword) {
        return makesService.search(keyword)
        .then(response => {
            commit(SET_MAKES, response);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Deletes the given make
     *
     * @param {Object} param0
     * @param {Object} params
     */
    destroy ({commit}, params) {
        return makesService.destroy(params)
        .then(response => {
            commit(REMOVE_MAKE, params.id);
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