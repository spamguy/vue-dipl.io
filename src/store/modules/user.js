import Game from '../../api/game';
import * as types from '../mutation-types';

const state = {
    user: { },
    games: {
        finished: [ ],
        waiting: [ ],
        active: [ ]
    }
};

const mutations = {
    [types.SET_FINISHED_GAMES](state, games) {
        state.games.finished = games.data.Properties;
    },
    [types.SET_STARTED_GAMES](state, games) {
        state.games.active = games.data.Properties;
    },
    [types.SET_STAGING_GAMES](state, games) {
        state.games.waiting = games.data.Properties;
    }
};

const actions = {
    async fetchFinishedGames({ commit }) {
        const games = await Game.getAllFinishedGamesForCurrentUser();
        commit(types.SET_FINISHED_GAMES, games);
    },
    async fetchActiveGames({ commit }) {
        const games = await Game.getAllActiveGamesForCurrentUser();
        commit(types.SET_STARTED_GAMES, games);
    },
    async fetchStagingGames({ commit }) {
        const games = await Game.getAllStagingGamesForCurrentUser();
        commit(types.SET_STAGING_GAMES, games);
    }
};

export default {
    state,
    mutations,
    actions
};
