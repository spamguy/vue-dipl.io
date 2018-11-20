import Client from './base';

export default {
    getAllFinishedGamesForCurrentUser: () => Client.get('Games/My/Finished'),

    getAllStagingGamesForCurrentUser: () => Client.get('Games/My/Staging'),

    getAllActiveGamesForCurrentUser: () => Client.get('Games/My/Started'),

    getGame: gameID => Client.get(`Game/${gameID}`),

    createGame: game => Client.post('/Game', game),

    /**
     * Gets all open (unstarted) games.
     * @returns {Promise<object[]>} A list of games.
     */
    getAllOpenGames: () => Client.get('Games/Open'),

    /**
     * Gets all finished games.
     * @returns {Promise<object[]>} A list of games.
     */
    getAllFinishedGames: () => Client.get('Games/Finished'),

    /**
     * Gets all active games.
     * @returns {Promise<object[]>} A list of games.
     */
    getAllActiveGames: () => Client.get('Games/Started'),

    /**
     * Joins a game.
     * @returns {Promise<object>} The joined game.
     */
    joinGame: (gameID, options) => Client.post(`/Game/${gameID}/Member`, options)
};
