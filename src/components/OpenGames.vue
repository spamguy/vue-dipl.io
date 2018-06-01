<template>
    <v-layout column justify-center>
        <v-flex>
            <div class="display-3 text-xs-center">Open Games</div>
        </v-flex>
        <v-flex>
            <v-list class="elevation-1" two-line>
                <game-list-item v-for="game in games"
                                :key="game.Id"
                                :game="game" />
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script>
import Game from '@/api/game';
import GameListItem from '@/components/GameListItem';

export default {
    name: 'OpenGames',
    components: {
        'game-list-item': GameListItem
    },
    data: () => ({
        games: []
    }),
    async created() {
        this.games = await Game.getAllOpenGames();
    }
};
</script>
