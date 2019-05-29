import vehicleService from './../../services/vehicles';
import { ADD_VEHICLE, SET_VEHICLES } from './../mutation-types';


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
     * Returns all vehicles
     *
     * @param {Object} state
     * @returns {Object}
     */
    getVehicles (state) {
        return state.all;
    },

    /**
     * Gets the page details object
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
     * Sets vehicles in state
     *
     * @param {Object} state
     * @param {Object} payload
     */
    [SET_VEHICLES] (state, payload) {
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
     * Gets all vehicles
     *
     * @param {Object} param0
     * @param {Object} payload
     */
    getVehicles ({commit}, params, search = false) {
        return vehicleService.index(params)
        .then(response => {
            if (!search) {
                commit(SET_VEHICLES, response);
            }
            return Promise.resolve(response);
        })
        .catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Store Vehicle
     *
     * @param {Object} param0
     * @param {Object} payload
     */
    store({commit}, payload) {
        return vehicleService.store(payload)
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    show({commit}, params) {
        return vehicleService.show(params).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    update ({commit}, payload) {
        return vehicleService.update(payload.id, payload.data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },


    /**
     * Changes ownership of vehicle
     *
     * @param {Object} vuexContext.commit
     * @param {Object} params
     * @returns {Object}
     */
    changeOwnerShip ({commit}, params) {
        return vehicleService.changeOwnerShip(params).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        })
    },

    /**
     * Changes vehicle ownership to existing owner
     *
     * @param {Object} param0
     * @param {Object} params
     */
    changeExistingOwnership({commit}, params) {
        return vehicleService.changeExistingOwnership(params)
        .then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        })
    },

    getTransferLetter({ commit }, params) {
        return vehicleService.getTransferLetter(params)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error));
    },

    getPrintData({commit}, params) {
        return vehicleService.getPrintData(params)
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