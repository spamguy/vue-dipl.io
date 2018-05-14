import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Login from '@/components/Login';
import AuthBase from '@/components/AuthBase';
import UserGames from '@/components/UserGames';
import Game from '@/components/Game';
import NewGame from '@/components/NewGame';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        {
            path: '/',
            component: AuthBase,
            children: [
                {
                    path: '/profile/games',
                    component: UserGames
                }, {
                    path: '/games/new',
                    component: NewGame
                }, {
                    name: 'game',
                    path: '/games/:ID/:ordinal?',
                    component: Game
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    // Block unauthorised state changes.
    const isAuthenticated = to.matched[0].path === '' || to.matched[0].path === '/login' || Vue.localStorage.get('fakeID') || Vue.localStorage.get('token');
    next(isAuthenticated);
});

export default router;
