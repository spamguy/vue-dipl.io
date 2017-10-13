import Vue from 'vue';
import router from '@/router';

export default {
    async logIn(fakeID) {
        if (fakeID) {
            Vue.localStorage.set('fakeID', fakeID);
            router.push('profile/games');
        }
        else {
            window.location = process.env.DIPLICITY_ENDPOINT + '/Auth/Login?redirect-to=' +
                    encodeURIComponent(process.env.DOMAIN + '/profile/games');
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
