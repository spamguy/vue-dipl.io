<template>
    <v-layout column justify-center>
        <v-flex>
            <div class="display-3 text-xs-center">Open Games</div>
        </v-flex>
        <v-flex>
            <v-list class="elevation-1" two-line>
                <game-list-item v-for="game in games"
                                v-if="!getUserAsPlayer(game, user)"
                                :key="game.Id"
                                :game="game" />
            </v-list>
        </v-flex>
        <game-details-dialog />
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import Game from '@/api/game';
import GameListItem from '@/components/GameListItem';
import GameMixin from '@/mixins/game';
import GameDetailsDialog from '@/components/GameDetailsDialog';

export default {
    name: 'OpenGames',
    components: {
        'game-list-item': GameListItem,
        'game-details-dialog': GameDetailsDialog
    },
    mixins: [GameMixin],
    data: () => ({
        games: []
    }),
    computed: {
        ...mapGetters(['user'])
    },
    async created() {
        this.games = await Game.getAllOpenGames();
    }
};
</script>
