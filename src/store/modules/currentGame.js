import MutationTypes from '../mutation-types';
import Game from '@/api/game';
import Phase from '@/api/phase';

const state = {
    currentGame: {
        Members: [],
        Variant: null
    },
    phases: [],
    orders: [],
    phaseOrdinal: 1
};

const getters = {
    game: (state) => state.currentGame,
    phase: (state) => state.phases.length
        ? state.phases[state.phaseOrdinal - 1]
        : null,
    orders: (state) => state.orders,
    lastPhaseOrdinal: (state) => state.phases.length,
    gameVariant: (state, getters, rootState, rootGetters) => {
        // Defer to an existing Vuex getter for this info.
        return state.currentGame.Variant ? rootGetters.getVariant(state.currentGame.Variant) : null;
    }
};

const mutations = {
    [MutationTypes.SET_CURRENT_GAME]: (state, game) => (state.currentGame = game),
    [MutationTypes.SET_CURRENT_GAME_PHASES]: (state, phases) => (state.phases = phases),
    [MutationTypes.SET_CURRENT_GAME_ORDERS]: (state, orders) => (state.orders = orders),
    [MutationTypes.SET_CURRENT_GAME_ORDINAL]: (state, phaseOrdinal) => (state.phaseOrdinal = phaseOrdinal)
};

const actions = {
    setGameData: async({ commit }, ID) => {
        const game = await Game.getGame(ID);
        const phases = await Phase.getPhasesForGame(ID);

        commit(MutationTypes.SET_CURRENT_GAME, game);
        commit(MutationTypes.SET_CURRENT_GAME_PHASES, phases);

        return game;
    },

    clearGameData: ({ commit }) => {
        commit(MutationTypes.SET_CURRENT_GAME, { Members: [] });
        commit(MutationTypes.SET_CURRENT_GAME_PHASES, []);
        commit(MutationTypes.SET_CURRENT_GAME_ORDERS, []);
        commit(MutationTypes.SET_CURRENT_GAME_ORDINAL, 1);
    },

    setOrdinal: async({ commit, state }, { ID, ordinal }) => {
        // Undefined/invalid ordinal is set to last phase by default.
        if (!ordinal || ordinal < 0 || ordinal > state.phases.length)
            ordinal = state.phases.length;

        commit(MutationTypes.SET_CURRENT_GAME_ORDINAL, ordinal);

        // No phases = no orders.
        let orders;
        if (ordinal > 0)
            orders = await Phase.getOrders(ID, ordinal);

        if (orders && orders.length)
            commit(MutationTypes.SET_CURRENT_GAME_ORDERS, orders);

        return orders;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
