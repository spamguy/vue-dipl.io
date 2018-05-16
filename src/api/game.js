import { Client } from './base';

export default {
    getAllFinishedGamesForCurrentUser: () => Client.get('Games/My/Finished'),
    
    getAllStagingGamesForCurrentUser: () => Client.get('Games/My/Staging'),

    getAllActiveGamesForCurrentUser: () => Client.get('Games/My/Started'),

    getGame: gameID => Client.get('Game/' + gameID),

    createGame: game => Client.post('/Game', game)
};
