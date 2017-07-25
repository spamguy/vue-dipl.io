import {Client} from './base';

export default {
    getAllFinishedGamesForCurrentUser() {
        return Client.get('Games/My/Finished');
    },

    getAllStagingGamesForCurrentUser() {
        return Client.get('Games/My/Staging');
    },

    getAllActiveGamesForCurrentUser() {
        return Client.get('Games/My/Started');
    }
};
