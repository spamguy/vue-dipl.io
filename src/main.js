import Vue from 'vue';
import Vuetify from 'vuetify';
import VueLocalStorage from 'vue-localstorage';

import App from './components/App';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.use(VueLocalStorage);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
