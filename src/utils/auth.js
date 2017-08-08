import Vue from 'vue';
import router from '@/router';

export default {
    logOut: () => {
        // Purge local storage.
        Vue.localStorage.remove('fakeID');
        Vue.localStorage.remove('token');

        // Go home.
        router.push('/');
    }
};
