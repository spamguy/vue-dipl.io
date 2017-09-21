import {Client} from './base';

export default {
    getPhasesForGame: async function(gameID) {
        return Client.extractData(await Client.get('Game/' + gameID + '/Phases'));
    },

    getCurrentPhaseForGame(phases) {
        if (!phases || !phases.length)
            return null;
        return phases.slice(-1)[0].Properties;
    }
};
