import Client from './base';

export default {
    getPhasesForGame: gameID => Client.get(`Game/${gameID}/Phases`),

    getMapForPhase: phase => Client.get(`Game/${phase.gameID}/Phase/${phase.PhaseOrdinal}/Map`),

    publishOrder: (game, phase, order) => Client.post(`/Game/${game.ID}/Phase/${phase.PhaseOrdinal}`, order),

    getOrders: (gameID, phaseOrdinal) => Client.get(`Game/${gameID}/Phase/${phaseOrdinal}/Orders`)
};
