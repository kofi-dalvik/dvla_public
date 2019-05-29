import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',

    /**
     * After each route set the body scroll to the cordinates given.
     *
     * @param  {Object} to
     * @param  {Object} from
     * @param  {Object} savedPosition
     * @return {Object}
     */
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    }
});

/**
 * Before each route:
 *     - Show the app's loader.
 *     - Set the current page's (to) title.
 *  */
router.beforeEach((to, from, next) => {
    // store.dispatch('showLoader');
    authCheck(to, next);
	// store.dispatch('setPageTitle', to.name.replace('_', ' ').toTitleCase());

    next();
});

/**
 * After each route:
 *     - Hide the app's loader.
 */
router.afterEach((to, from) => {
	// store.dispatch('hideLoader');
});

/**
 * An authentication middleware.
 *
 * @param {Object} to
 * @param {Function} next
 * @return {Undefined}
 */
const authCheck = (to, next) => {
	const isloggedIn = store.getters['Auth/check'];

	// Redirect to login if not authenticated
	// if (!isloggedIn && to.name !== 'login') {
	//     store.dispatch('setPageTitle', 'Login');
	//     next({ name: 'login' });
	// }

	// Redirect to dashboard if already authenticated
	if (isloggedIn && to.name == 'login') {
        store.dispatch('setPageTitle', 'Dashboard');
	    next({ name: 'dashboard' });
	}
};

export default router;