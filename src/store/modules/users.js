import UsersService from '../../services/users';
import { SET_USERS } from '../mutation-types';

const state = {
    users: [],
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
	 * Get all users from the state.
	 *
	 * @param  {Object} state
	 * @return {String}
	 */
    getAll(state) {
        return state.users;
    },

	/**
	 * Page details.
	 *
	 * @param {Object} state
	 * @return {Object}
	 */
    getPageDetails(state) {
        return state.pageDetails;
    }
};

const mutations = {
    [SET_USERS](state, payload) {
        if (payload.data) {
            state.users = payload.data;

            state.pageDetails = {
                total: payload.total,
                from: payload.from,
                to: payload.to,
                currentPage: payload.current_page,
                lastPage: payload.last_page,
                perPage: payload.per_page
            };
        } else {
            state.users = payload;
        }
    }
};

const actions = {
	/**
	 * Get all data collectors.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} query
	 * @return {Object}
	 */
    all({ commit }, query) {
        return UsersService.all(query)
            .then((response) => {
                commit(SET_USERS, response);
                return Promise.resolve(response);
            })
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Store a new data collector.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Object} payload
	 * @return {Object}
	 */
    store({ commit, actions }, { data }) {
        return UsersService.store(data)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Get the specified data collector.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Number} id
	 * @return {Object}
	 */
    show({ commit, actions }, id) {
        return UsersService.show(id)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Update the specified data collector.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Object} payload
	 * @return {Object}
	 */
    update({ commit, actions }, { id, data }) {
        return UsersService.update(id, data)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },

	/**
	 * Delete the specified data collector.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} options.actions
	 * @param  {Number} id
	 * @return {Object}
	 */
    delete({ commit, actions }, id) {
        return UsersService.delete(id)
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