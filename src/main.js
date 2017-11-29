import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuefire from 'vuefire';
import VueLocalStorage from 'vue-localstorage';

import App from './components/App';
import router from './router';
import store from './store';
import firebase from './firebase';

Vue.use(Vuefire);
Vue.use(Vuetify);
Vue.use(VueLocalStorage);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    firebase,
    render: h => h(App)
});
