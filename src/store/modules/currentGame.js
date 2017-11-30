import MutationTypes from '../mutation-types';
import Game from '@/api/game';
import Phase from '@/api/phase';

const state = {
    currentGame: {},
    phases: [],
    orders: [],
    phaseOrdinal: 1
};

const getters = {
    game: (state) => state.currentGame,
    phase: (state) => state.phases.length
        ? state.phases[state.phaseOrdinal - 1].Properties
        : null,
    orders: (state) => state.orders,
    lastPhaseOrdinal: (state) => state.phases.length,
    gameVariant: (state, getters, rootState, rootGetters) => {
        // Defer to an existing Vuex getter for this info.
        return state.currentGame.Variant
            ? rootGetters.getVariant(state.currentGame.Variant)
            : { };
    }
};

const mutations = {
    [MutationTypes.SET_CURRENT_GAME]: (state, game) => (state.currentGame = game),
    [MutationTypes.SET_CURRENT_GAME_PHASES]: (state, phases) => (state.phases = phases),
    [MutationTypes.SET_CURRENT_GAME_ORDERS]: (state, orders) => (state.orders = orders),
    [MutationTypes.SET_CURRENT_GAME_ORDINAL]: (state, phaseOrdinal) => (state.phaseOrdinal = phaseOrdinal)
};

const actions = {
    setGameData: async({ commit }, gameID, phaseOrdinal) => {
        const game = await Game.getGame(gameID);
        const phases = await Phase.getPhasesForGame(gameID);

        if (!phaseOrdinal)
            phaseOrdinal = phases.length;

        // No phases = no orders.
        let orders;
        if (phaseOrdinal > 0)
            orders = await Phase.getOrders(gameID, phaseOrdinal);

        commit(MutationTypes.SET_CURRENT_GAME, game);
        commit(MutationTypes.SET_CURRENT_GAME_PHASES, phases);
        commit(MutationTypes.SET_CURRENT_GAME_ORDINAL, phaseOrdinal);

        if (orders.length)
            commit(MutationTypes.SET_CURRENT_GAME_ORDERS, orders);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
