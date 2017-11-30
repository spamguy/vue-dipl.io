import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import variant from './modules/variant';
import currentGame from './modules/currentGame';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        variant,
        currentGame
    }
});
