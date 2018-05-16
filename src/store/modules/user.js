import MutationTypes from '../mutation-types';

const state = {
    user: {
        Glicko: {
            PracticalRating: 0
        },
        User: {
            Email: null,
            Name: null
        }
    }
};

const getters = {
    user: state => state.user.User,
    userStats: state => state.user.Glicko
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
