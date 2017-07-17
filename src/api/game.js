import {Client} from './base';

export default {
    getAllFinishedGamesForCurrentUser() {
        return Client.get('Games/My/Finished');
    }
};
