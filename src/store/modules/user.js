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
    }
};

const actions = {
    async fetchFinishedGames({ commit }) {
        const games = await Game.getAllFinishedGamesForCurrentUser();
        commit(types.SET_FINISHED_GAMES, games);
    }
};

export default {
    state,
    mutations,
    actions
};
