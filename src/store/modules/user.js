import User from '../../api/user';
import * as types from '../mutation-types';

const state = {

};

const actions = {
    async [types.GET_USER_TOKEN]({ commit }) {
        const token = await User.getUserToken();
        commit(types.SET_USER_TOKEN, token);
    }
};

export default {
    state,
    actions
};
