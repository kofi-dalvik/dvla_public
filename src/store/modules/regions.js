import RegionsService from '../../services/regions';
import { SET_REGIONS } from '../mutation-types';

const state = {
	regions: []
};

const getters = {
	/**
	 * Get all regions from the state.
	 *
	 * @param  {Object} state
	 * @return {String}
	 */
	getAll(state) {
		return state.regions;
	}
};

const mutations = {
	[SET_REGIONS](state, payload) {
		state.regions = payload;
	},
};

const actions = {
	/**
	 * Get all form statuses.
	 *
	 * @param  {Object} options.commit
	 * @param  {Object} query
	 * @return {Object}
	 */
	all({ commit }, query) {
		return RegionsService.all(query)
			.then((response) => {
				commit(SET_REGIONS, response);
				return Promise.resolve(response);
			})
			.catch((error) => Promise.reject(error));
	},
};

const namespaced = true;

export default {
	namespaced,
	state,
	actions,
	getters,
	mutations
};