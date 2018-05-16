import Game from '@/api/game';
import Variant from '@/api/variant';
import { Client } from '@/api/base';
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
            expect(variants.length).to.equal(3);
        });

        it('fetches a variant\'s map', async() => {
            mock.onGet('Variant/Pure/Map.svg').reply(200, '<svg></svg>');
            const svgMap = await Variant.getVariantMap('Pure');
            expect(svgMap.data).to.equal('<svg></svg>');
        });
    });
});
