import MutationTypes from '../mutation-types';

const state = {
    user: {
        Name: '?'
    }
};

const getters = {
    user: state => state.user
};

const mutations = {
    [MutationTypes.SET_USER]: (state, user) => (state.user = user)
};

const actions = {
    setUser: ({ commit }, user) => commit(MutationTypes.SET_USER, user)
};

export default {
    state,
    getters,
    mutations,
    actions
};
