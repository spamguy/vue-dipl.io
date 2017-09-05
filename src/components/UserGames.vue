<template>
    <div class="ma-3 elevation-1">
        <v-tabs dark>
            <v-tabs-bar slot="activators">
                <v-tabs-item
                    v-for="tab in tabs"
                    :key="tab"
                    :href="'#' + tab"
                    ripple
                >
                    {{tab}}
                </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-content id="Active">
                <div v-if="!activeGames.length">Nothing here.</div>
                <v-card flat>
                    <game-list-item
                        v-for="game in activeGames"
                        :key="game.Properties.Id"
                        :game="game.Properties">
                    </game-list-item>
                </v-card>
            </v-tabs-content>
            <v-tabs-content id="Waiting">
                <div v-if="!waitingGames.length">Nothing here.</div>
                <v-card flat>
                    <game-list-item
                        v-for="game in waitingGames"
                        :key="game.Properties.Id"
                        :game="game.Properties">
                    </game-list-item>
                </v-card>
            </v-tabs-content>
            <v-tabs-content id="Finished">
                <div v-if="!finishedGames.length">Nothing here.</div>
                <v-card flat>
                    <game-list-item
                        v-for="game in finishedGames"
                        :key="game.Properties.Id"
                        :game="game.Properties">
                    </game-list-item>
                </v-card>
            </v-tabs-content>
        </v-tabs>
    </div>
</template>

<script>
import GameListItem from '@/components/GameListItem';

export default {
    name: 'usergames',
    data() {
        return {
            tabs: ['Active', 'Waiting', 'Finished']
        };
    },
    components: {
        'game-list-item': GameListItem
    },
    computed: {
        activeGames() {
            return this.$store.state.user.games.active;
        },
        waitingGames() {
            return this.$store.state.user.games.waiting;
        },
        finishedGames() {
            return this.$store.state.user.games.finished;
        }
    },

    created() {
        this.$store.dispatch('fetchFinishedGames');
        this.$store.dispatch('fetchStagingGames');
        this.$store.dispatch('fetchActiveGames');
    }
};
</script>

<style lang="scss">
</style>
