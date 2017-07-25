import User from '../../../../src/api/user';
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

    describe('User', () => {
        it('fetches a user token', async () => {
            mock.onGet('Auth/Login', { params: { 'redirect-to': encodeURIComponent('undefined/main/login') } }).reply(200, {
                ID: 'abc123'
            });
            const user = await User.getUserToken();
            expect(user.data.ID).to.equal('abc123');
        });
    });

    describe('Game', () => {
        it('fetches finished games', async () => {
            mock.onGet('Games/My/Finished').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllFinishedGamesForCurrentUser();
            expect(games.data.Properties.length).to.equal(2);
        });

        it('fetches active games', async () => {
            mock.onGet('Games/My/Started').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllActiveGamesForCurrentUser();
            expect(games.data.Properties.length).to.equal(2);
        });

        it('fetches staging games', async () => {
            mock.onGet('Games/My/Staging').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllStagingGamesForCurrentUser();
            expect(games.data.Properties.length).to.equal(2);
        });
    });
});
