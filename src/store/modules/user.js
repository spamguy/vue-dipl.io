import User from '../../api/user';
import * as types from '../mutation-types';

const state = {
    user: { },
    fakeID: '',
    userToken: ''
};

const mutations = {
    [types.SET_USER_TOKEN](state, token) {
        state.userToken = token;
    },

    [types.SET_FAKE_ID](state, fakeID) {
        state.fakeID = fakeID;
    }
};

const actions = {
    async setUserToken({ commit }, fakeID) {
        if (fakeID) {
            commit(types.SET_FAKE_ID, fakeID);
            return fakeID;
        }
        else {
            const token = await User.getUserToken();
            commit(types.SET_USER_TOKEN, token);
            return token;
        }
    }
};

export default {
    state,
    mutations,
    actions
};
