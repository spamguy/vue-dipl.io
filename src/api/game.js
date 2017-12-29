import { Client } from './base';

export default {
    async getAllFinishedGamesForCurrentUser() {
        return Client.extractData(await Client.get('Games/My/Finished'));
    },

    async getAllStagingGamesForCurrentUser() {
        return Client.extractData(await Client.get('Games/My/Staging'));
    },

    async getAllActiveGamesForCurrentUser() {
        return Client.extractData(await Client.get('Games/My/Started'));
    },

    async getGame(gameID) {
        return Client.extractData(await Client.get('Game/' + gameID));
    },

    createGame(game) {
        return Client.post('/Game', game);
    },

    getUserData() {
        return Client.get('/');
    }
};
