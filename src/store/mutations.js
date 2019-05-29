import {
	SET_PAGE_TITLE,
	SHOW_APP_LOADER,
	HIDE_APP_LOADER
} from './mutation-types';

export default {
	[SET_PAGE_TITLE](state, title) {
		document.title = `${title}`;
		state.currentPageTitle = title
	},

	[SHOW_APP_LOADER](state) {
		state.showLoader = true;
	},

	[HIDE_APP_LOADER](state) {
		state.showLoader = false;
	}
}