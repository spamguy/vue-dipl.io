import Vue from 'vue';
import router from '@/router';

import User from '../api/user';

export default {
    async logIn(fakeID) {
        if (fakeID) {
            Vue.localStorage.set('fakeID', fakeID);
            router.push('profile/games');
        }
        else {
            const token = await User.getUserToken();

            if (token) {
                Vue.localStorage.set('token', token);
                router.push('profile/games');
            }
        }
    },

    logOut: () => {
        // Purge local storage.
        Vue.localStorage.remove('fakeID');
        Vue.localStorage.remove('token');

        // Go home.
        router.push('/');
    }
};
