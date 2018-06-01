<template>
    <!-- TODO: Refactor into generic list of games. -->
    <v-list two-line>
        <game-list-item v-for="game in games"
                        :key="game.Id"
                        :game="game" />
    </v-list>
</template>

<script>
import Game from '@/api/game';
import GameListItem from '@/components/GameListItem';

export default {
    name: 'ArchivedGames',
    components: {
        'game-list-item': GameListItem
    },
    data: () => ({
        games: []
    }),
    async created() {
        const result = await Promise.all([
            Game.getAllActiveGames(),
            Game.getAllFinishedGames()
        ]);
        this.games.concat.apply([], result);
    }
};
</script>
