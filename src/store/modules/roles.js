import RolesService from '../../services/roles';
import { SET_ROLES } from '../mutation-types';

const state = {
    roles: []
};

const getters = {
	/**
	 * Get all roles from the state
	 *
	 * @param  {Object} state
	 * @return {String}
	 */
    getAll(state) {
        return state.roles;
    }
};

const mutations = {
    [SET_ROLES](state, payload) {
        state.roles = payload;
    },
};

const actions = {
	/**
	 * Get all roles from the server.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} query
	 * @return {Object}
	 */
    all({ commit }, query) {
        return RolesService.all(query)
            .then((response) => {
                commit(SET_ROLES, response);
                return Promise.resolve(response);
            })
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Store a role
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Object} role
	 * @return {Object}
	 */
    store({ commit, actions }, role) {
        return RolesService.store(role)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Get the specified role
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Number} id Id of role
	 * @return {Object}
	 */
    show({ commit, actions }, id) {
        return RolesService.show(id)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Update the specified role
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Object} role Update a given role
	 * @return {Object}
	 */
    update({ commit, actions }, role) {
        return RolesService.update(role.id, role.data)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Delete the specified hierarchy.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Number} id Id of role
	 * @return {Object}
	 */
    delete({ commit, actions }, id) {
        return RolesService.delete(id)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    getters,
    mutations
}