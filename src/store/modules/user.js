import MutationTypes from '../mutation-types';

const state = {
    isDrawerOpen: false,
    user: { }
};

const mutations = {
    [MutationTypes.TOGGLE_DRAWER]: (state) => (state.isDrawerOpen = !state.isDrawerOpen)
};

const actions = {
    toggleDrawer: ({ commit }) => commit(MutationTypes.TOGGLE_DRAWER)
};

export default {
    state,
    mutations,
    actions
};
