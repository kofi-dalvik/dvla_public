export default {
	/**
	 * Get the current page's title.
	 * 
	 * @param  {Object} state
	 * @return {String}      
	 */
	pageTitle(state) {
		return state.currentPageTitle;
	},

	/**
	 * Get the status of the app's loader.
	 * 
	 * @param  {Object} state
	 * @return {Boolean}      
	 */
	showLoaderStatus(state) {
		return state.showLoader;
	}
}