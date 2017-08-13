import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import Auth from '../../../../src/utils/auth';

Vue.use(VueLocalStorage);

describe('Authentication utility', () => {
    afterEach(() => localStorage.clear());

    it('retains fake IDs', async () => {
        await Auth.logIn('my-bogus-name');
        expect(Vue.localStorage.get('fakeID')).to.equal('my-bogus-name');
        expect(Vue.localStorage.get('token')).to.be.null;
    });

    it('clears local storage data on logout', () => {
        Vue.localStorage.set('token', 12345);
        Vue.localStorage.set('fakeID', 'my-bogus-name');

        Auth.logOut();
        expect(Vue.localStorage.get('token')).to.be.null;
        expect(Vue.localStorage.get('fakeID')).to.be.null;
    });
});
