import Vue from 'vue';
import Vuetify from 'vuetify';
import Home from '@/components/Home';

describe('Home.vue', () => {
    var Constructor,
        vm;

    beforeEach(() => {
        Vue.use(Vuetify);
        Constructor = Vue.extend(Home);
        vm = new Constructor().$mount();
    });

    it('has a log in button', () => {
        expect(vm.$el.querySelector('.btn__content').textContent).to.equal('Log In');
    });
});
