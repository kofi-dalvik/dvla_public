import { 
    SET_PAGE_TITLE, 
    SHOW_APP_LOADER, 
    HIDE_APP_LOADER
} from './mutation-types';

export default {
    /**
     * This action sets the page title depending on the current route.
     * 
     * @param {Object} options.commit
     * @param {String} title         
     */
    setPageTitle({ commit }, title) {
        commit(SET_PAGE_TITLE, title);
    },

    /**
     * This action shows the app's loader which is needed whenever
     * the app is doing something asynchronously.
     *
     * @param {Object} options.commit
     */
    showLoader({ commit }) {
        commit(SHOW_APP_LOADER);
    },

    /**
     * This action hides the app's loader.
     *
     * @param {Object} options.commit
     */
    hideLoader({ commit }) {
        commit(HIDE_APP_LOADER);
    }
}