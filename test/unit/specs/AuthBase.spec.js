import Vue from 'vue';
import Vuetify from 'vuetify';
import AuthBase from '@/components/AuthBase';

describe('AuthBase.vue', () => {
    var Constructor,
        vm;

    beforeEach(() => {
        Vue.use(Vuetify);
        Constructor = Vue.extend(AuthBase);
        vm = new Constructor().$mount();
    });

    it('has a sidebar', () => {
        expect(vm.$el.querySelector('.navigation-drawer')).to.exist;
    });
});
