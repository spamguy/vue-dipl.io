import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import variant from './modules/variant';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        variant
    }
});
