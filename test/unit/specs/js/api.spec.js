import User from '../../../../src/api/user';
import Game from '../../../../src/api/game';
import Variant from '../../../../src/api/variant';
import {Client} from '../../../../src/api/base';
import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import MockAdapter from 'axios-mock-adapter';

Vue.use(VueLocalStorage);

describe('API', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(Client);
    });
    afterEach(() => {
        mock.restore();
    });

    it('extracts data from a response object', () => {
        const bogusResponse = { data: { Properties: [ { } ] } };
        expect(Client.extractData(bogusResponse)).to.be.an('Array');
    });

    describe('User', () => {
        it('fetches a user token', async() => {
            mock.onGet('Auth/Login', { params: { 'redirect-to': encodeURIComponent('undefined/main/login') } }).reply(200, {
                ID: 'abc123'
            });
            const user = await User.getUserToken();
            expect(user.data.ID).to.equal('abc123');
        });
    });

    describe('Game', () => {
        it('fetches finished games', async() => {
            mock.onGet('Games/My/Finished').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllFinishedGamesForCurrentUser();
            expect(games.length).to.equal(2);
        });

        it('fetches active games', async() => {
            mock.onGet('Games/My/Started').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllActiveGamesForCurrentUser();
            expect(games.length).to.equal(2);
        });

        it('fetches staging games', async() => {
            mock.onGet('Games/My/Staging').reply(200, {
                Properties: [{ name: 'Game 1 ' }, { name: 'Game 2' }]
            });
            const games = await Game.getAllStagingGamesForCurrentUser();
            expect(games.length).to.equal(2);
        });
    });

    describe('Variant', () => {
        afterEach(() => localStorage.clear());

        it('fetches all variants', async() => {
            mock.onGet('Variants').reply(200, {
                Properties: [{ Name: 'Classical' }, { Name: 'France vs. Austria' }, { Name: 'Ancient Mediterranian' }]
            });
            const variants = await Variant.getAllVariants();
            expect(variants.data.Properties.length).to.equal(3);
        });

        it('fetches one variant', () => {
            Vue.localStorage.set('variants', '[{ "Name": "Classical" }, { "Name": "France vs. Austria" }, { "Name": "Ancient Mediterranian" }]');
            const variant = Variant.getVariant('France vs. Austria');
            expect(variant.Name).to.equal('France vs. Austria');
        });

        it('sets variant array in local storage', () => {
            Variant.setVariants([{ Name: 'Classical' }, { Name: 'France vs. Austria' }, { Name: 'Ancient Mediterranian' }]);
            expect(Vue.localStorage.get('variants')).not.to.be.undefined;
        });
    });
});
