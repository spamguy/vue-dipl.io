import {Client} from './base';

export default {
    getPhasesForGame: async function(game) {
        return Client.extractData(await Client.get('Game/' + game.ID + '/Phases'));
    },

    getMapForPhase(phase) {
        return phase ? Client.get('Game/' + phase.GameID + '/Phase/' + phase.PhaseOrdinal + '/Map') : null;
    },

    getCurrentPhaseForGame(phases) {
        if (!phases || !phases.length)
            return null;
        return phases.slice(-1)[0].Properties;
    }
};
