import MutationTypes from '../mutation-types';

const state = {
    user: { }
};

const getters = {
    currentUserID: state => state.user.ID
};

const mutations = {
    [MutationTypes.SET_USER]: (state, user) => (state.user = user.data.Properties.User)
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
