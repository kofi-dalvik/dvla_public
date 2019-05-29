import modelsServices from '@/services/models.js';

import {
    ADD_MODEL,
    SET_MODELS,
    REMOVE_MODEL
} from './../mutation-types';

const state = {
    all: []
};

const getters = {
    getModels (state) {
        return state.all
    }
};

const mutations = {
    /**
     * Replaces the model with given array
     *
     * @param {Object} state
     * @param {Array} payload
     */
    [SET_MODELS](state, payload) {
        state.all = payload;
    },


    /**
     * Adds a created model
     *
     * @param {Object} state
     * @param {Object} payload
     */
    [ADD_MODEL](state, payload) {
        state.all.unshift(payload);
    },


    /**
     * Removes a given model from state
     *
     * @param {Object} state
     * @param {Number} id
     */
    [REMOVE_MODEL](state, id) {
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
     * Creates a new model
     *
     * @param {Object} param0
     * @param {Object} make
     */
    createModel({ commit }, model) {
        return modelsServices.create(model)
            .then(response => {
                commit(ADD_MODEL, response);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            })
    },

    /**
     * Gets all models
     *
     * @param {Object} param0
     * @param {Object} params
     */
    getModels({ commit }, params) {
        return modelsServices.index(params)
            .then(response => {
                // commit(SET_MODELS, response);
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },

     /**
      * Search for models
      *
      * @param {Object} param0
      * @param {Object} keyword
      */
     search({ commit }, keyword) {
         return modelsServices.search(keyword)
             .then(response => {
                 commit(SET_MODELS, response);
                 return Promise.resolve(response);
             })
             .catch(error => {
                 return Promise.reject(error);
             });
     },

    //  /**
    //   *
    //   * @param {Oboject} param0
    //   * @param {Object} params
    //   */
    //  getModelsByMake({ commit }, params) {
    //     modelsServices.getModelsByMake(make_id)
    //     .then(response => {
    //         return Promise.resolve(response);
    //     })
    //     .catch(error => {
    //         return Promise.reject(error.response.data);
    //     });
    //  },

    /**
     * Deletes the given model
     *
     * @param {Object} param0
     * @param {Object} params
     */
    destroy ({ commit }, params) {
        return modelsServices.destroy(params)
            .then(response => {
                commit(REMOVE_MODEL, params.id);
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