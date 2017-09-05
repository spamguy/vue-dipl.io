import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import AuthBase from '@/components/AuthBase';
import UserGames from '@/components/UserGames';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
    // Block unauthorised state changes.
    const isAuthenticated = to.matched[0].path === '' || Vue.localStorage.get('fakeID') || Vue.localStorage.get('token');
    next(isAuthenticated);
});

export default router;
