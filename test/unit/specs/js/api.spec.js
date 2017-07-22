import Game from '../../../../src/api/game';
import {Client} from '../../../../src/api/base';
import MockAdapter from 'axios-mock-adapter';

describe('API', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(Client);
    });
    afterEach(() => {
        mock.restore();
    });

    describe('Game', () => {
        it('fetches finished games', async () => {
            mock.onGet('Games/My/Finished').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllFinishedGamesForCurrentUser();
            expect(games.data.Properties.length).to.equal(2);
        });
    });
});
