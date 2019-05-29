import incidentsService from '../../services/incidents';


const state = {
    all: [],
    vehicles: {
        all: [],
        pageDetails: {
            total: 0,
            from: 0,
            to: 0,
            perPage: 0,
            currentPage: 0,
            lastPage: 0
        }
    },
    types: []
};

const getters = {
    /**
     * Returns all incidence
     *
     * @param {Object} state
     * @returns {Object}
     */
    getIncidences(state) {
        return state.all;
    },

    /**
     * Returns the vehicles with incidents
     *
     * @param {Object} state
     * @returns {Array}
     */
    getVehicles (state) {
        return state.vehicles.all;
    },

    getVehiclesPageDetails (state) {
        return state.vehicles.pageDetails;
    },

    /**
     * Returns all incident types
     *
     * @param {Object} state
     * @returns {Array}
     */
    getTypes (state) {
        return state.types;
    }
};

const mutations = {
    /**
     * Sets incidences in state
     *
     * @param {Object} state
     * @param {Object} payload
     */
    ['SET_INCIDENTS'](state, payload) {
        state.all = payload;
    },

    /**
     * Sets vehicles with incidences
     *
     * @param {Object} state
     * @param {Object} payload
     */
    ['SET_INCIDENT_VEHICLES'] (state, payload) {
        state.vehicles.all = payload.data;
        state.vehicles.pageDetails = {
            total: payload.total,
            from: payload.from,
            to: payload.to,
            perPage: payload.per_page,
            currentPage: payload.current_page,
            lastPage: payload.last_page
        };
    },

    /**
     * Sets incident types
     *
     * @param {Object} state
     * @param {Array} payload
     */
    ['SET_INCIDENT_TYPES'] (state, payload) {
        state.types = payload;
    }
};

const actions = {
    /**
     * Gets incident types
     *
     * @param {Object} param0
     * @returns {Object}
     */
    getTypes ({commit}, params) {
        return incidentsService.getTypes(params).then(response => {
            commit('SET_INCIDENT_TYPES', response);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    getVehicles ({commit}, params) {
        return incidentsService.getVehicles(params).then(response => {
            commit('SET_INCIDENT_VEHICLES', response);
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Gets all vehicles
     *
     * @param {Object} param0
     * @param {Object} payload
     */
    getIncidents({ commit }, params) {
        return incidentsService.index(params)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },

    /**
     * Store Incidence
     *
     * @param {Object} param0
     * @param {Object} payload
     */
    store({ commit }, payload) {
        return incidentsService.store(payload)
            .then(response => {
                return Promise.resolve(response);
            }).catch(error => {
                return Promise.reject(error);
            });
    },

    show({
        commit
    }, params) {
        return incidentsService.show(params).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    update({ commit }, payload) {
        return incidentsService.update(payload.id, payload.data).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    /**
     * Creates a new incident update
     *
     * @param {Object} param0
     * @param {Object} payload
     */
    createUpdate({commit}, params) {
        return incidentsService.createUpdate(params).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
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