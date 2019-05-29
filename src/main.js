require('./bootstrap');

import Vue from 'vue';
import store from './store';
import App from './views/App';
import router from './router';
import { Globals } from './mixins';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, {
  events: 'input|blur'
});

// Register global mixins
Vue.mixin({
  mixins: [Globals]
});


Vue.config.productionTip = process.env.NODE_ENV !== 'production';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


