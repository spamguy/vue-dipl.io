import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueLocalStorage from 'vue-localstorage';

import Home from '@/components/Home';
import AuthBase from '@/components/AuthBase';
import UserGames from '@/components/UserGames';

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueLocalStorage);

export default new Router({
    routes: [
        { path: '/', component: Home },
        {
            path: '/',
            component: AuthBase,
            children: [
                {
                    path: '/profile/games',
                    component: UserGames
                }
            ]
        }
    ]
});
