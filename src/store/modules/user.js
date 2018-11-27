import MutationTypes from '../mutation-types';

const userState = {
    user: {
        Name: '',
        Email: ''
    },
    stats: {
        PracticalRating: 0
    }
};

const getters = {
    user: state => state.user,
    userStats: state => state.stats
};

const mutations = {
    [MutationTypes.SET_USER]: (state, { User }) => {
        state.user = User;
        return state;
    },

    [MutationTypes.SET_USER_STATS]: (state, stats) => {
        // The inner User object is *not* accurate and should be discarded.
        delete stats.User;
        state.stats = stats;
        return stats;
    }
};

const actions = {
    setUser: ({ commit }, user) => commit(MutationTypes.SET_USER, user),
    setUserStats: ({ commit }, stats) => commit(MutationTypes.SET_USER_STATS, stats)
};

export default {
    state: userState,
    getters,
    mutations,
    actions
};
