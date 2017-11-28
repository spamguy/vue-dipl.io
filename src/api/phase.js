import { Client } from './base';

export default {
    getPhasesForGame: async(gameID) => {
        return Client.extractData(await Client.get('Game/' + gameID + '/Phases'));
    },

    getCurrentPhaseForGame: (phases) => {
        if (!phases || !phases.length)
            return null;
        const result = phases.slice(-1)[0];
        return result ? result.Properties : null;
    },

    getMapForPhase: (phase) => {
        return Client.get('Game/' + phase.gameID + '/Phase/' + phase.PhaseOrdinal + '/Map');
    },

    publishOrder: (game, phase, order) => {
        return Client.post(`/Game/${game.ID}/Phase/${phase.PhaseOrdinal}`, order);
    },

    getOrders: async(gameID, phaseOrdinal) => {
        return Client.extractData(await Client.get('Game/' + gameID + '/Phase/' + phaseOrdinal + '/Orders'));
    }
};
