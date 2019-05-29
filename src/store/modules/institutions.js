import institutionService from '@/services/institutions';
import {
    SET_INSTITUTIONS,
    ADD_INSTITUTION,
    SET_INSTITUTION_TYPES,
    DELETE_INSTITUTION
} from './../mutation-types';


const state = {
    all: [],
    types: []
};

const getters = {
    /**
     * Gets apps institutions in app's state
     *
     * @param {Object} state
     * @return {Array}
     */
    getInstitutions (state) {
        return state.all;
    },


    /**
     * Get institutions
     *
     * @param {Object} state
     * @returns {Object}
     */
    getInstitutionTypes (state) {
        return state.types;
    }
};

const mutations = {
    /**
     * Sets institutions in app's state
     *
     * @param {Object} state
     * @param {Array} payload
     * @returns {Undefined}
     */
    [SET_INSTITUTIONS] (state, payload) {
        state.all = payload;
    },


    /**
     * Sets institution types
     *
     * @param {Object} state
     * @param {Object} payload
     * @returns {Undefined}
     */
    [SET_INSTITUTION_TYPES] (state, payload) {
        state.types = payload;
    },


    /**
     * Adds new Institution to the institutions
     *
     * @param {Object} state
     * @param {Object} payload
     * @returns {Undefined}
     */
    [ADD_INSTITUTION] (state, payload) {
        state.all.unshift(payload);
    },


    /**
     * Removes institution from state
     *
     * @param {Object} state
     * @param {Number} id
     */
    [DELETE_INSTITUTION] (state, id) {
        state.all.find((item, index) => {
            if (parseInt(item.id) === parseInt(id)) {
                state.all.splice(index, 1);
                return;
            }
        })
    }
};

const actions = {
    /**
     * Creates a new Institution
     *
     * @param {Object} commit
     * @param {Object} params
     * @returns {Object}
     */
    createInstitution ({commit}, params) {
        return institutionService.createInstitution(params)
        .then(response => {
            // commit(ADD_INSTITUTION, response);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Updates institutions
     *
     * @param {Object} param0
     * @param {Object} param1
     */
    update ({commit}, {id, data}) {
        return institutionService.update(id, data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },


    /**
     * Fetches institutions
     *
     * @param {Object} param0
     * @param {Object} params
     */
    getInstitutions ({commit}, params) {
        return institutionService.getInstitutions(params)
        .then(response => {
            commit(SET_INSTITUTIONS, response)
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        })
    },


    /**
     * Gets Institutions Types
     *
     * @param {Object} commit
     * @param {Object} params
     */
    getInstitutionTypes ({commit}, params) {
        return institutionService.getInstitutionTypes(params)
        .then(response => {
            commit(SET_INSTITUTION_TYPES, response);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        });
    },


    /**
     * Deletes institution by id
     *
     * @param {Object} param0
     * @param {Number} id
     * @returns {Object}
     */
    deleteInstitution ({commit}, id) {
        return institutionService.deleteInstitution(id)
        .then(response => {
            commit(DELETE_INSTITUTION, id);
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error.response.data);
        });
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}