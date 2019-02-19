<template>
    <div class="elevation-1">
        <v-tabs color="primary" dark>
            <v-tab v-for="tab in tabs"
                   :key="tab"
                   :href="'#' + tab"
                   ripple>
                {{tab}}
            </v-tab>
            <v-tab-item value="Active">
                <v-card v-if="loading || !activeGames.length">
                    <v-card-text class="display-2 text-xs-center">
                        <v-progress-circular
                            v-if="loading"
                            :size="50"
                            color="primary"
                            indeterminate
                        />
                        <div v-else>Nothing here.</div>
                    </v-card-text>
                </v-card>
                <v-list v-else two-line>
                    <game-list-item v-for="game in activeGames"
                                    :key="game.Id"
                                    :game="game" />
                </v-list>
            </v-tab-item>
            <v-tab-item value="Waiting">
                <v-card v-if="loading || !waitingGames.length">
                    <v-card-text class="display-2 text-xs-center">
                        <v-progress-circular
                            v-if="loading"
                            :size="50"
                            color="primary"
                            indeterminate
                        />
                        <div v-else>Nothing here.</div>
                    </v-card-text>
                </v-card>
                <v-list v-else two-line>
                    <game-list-item v-for="game in waitingGames"
                                    :key="game.Id"
                                    :game="game" />
                </v-list>
            </v-tab-item>
            <v-tab-item value="Finished">
                <v-card v-if="loading || !finishedGames.length">
                    <v-card-text class="display-2 text-xs-center">
                        <v-progress-circular
                            v-if="loading"
                            :size="50"
                            color="primary"
                            indeterminate
                        />
                        <div v-else>Nothing here.</div>
                    </v-card-text>
                </v-card>
                <v-list v-else two-line>
                    <game-list-item v-for="game in finishedGames"
                                    :key="game.Id"
                                    :game="game" />
                </v-list>
            </v-tab-item>
        </v-tabs>
        <game-details-dialog />
    </div>
</template>

<script>
import Game from '@/api/game';
import GameListItem from '@/components/GameListItem';
import GameDetailsDialog from '@/components/GameDetailsDialog';

export default {
    name: 'UserGames',
    components: {
        'game-list-item': GameListItem,
        'game-details-dialog': GameDetailsDialog
    },
    data: () => ({
        tabs: ['Active', 'Waiting', 'Finished'],
        finishedGames: [],
        waitingGames: [],
        activeGames: [],
        loading: true
    }),
    async beforeRouteEnter(to, from, next) {
        // TODO: Lazy load tab data. Finished game data in particular can be heavy.
        next(async (vm) => {
            [vm.activeGames, vm.waitingGames, vm.finishedGames] = await Promise.all([
                Game.getAllActiveGamesForCurrentUser(),
                Game.getAllStagingGamesForCurrentUser(),
                Game.getAllFinishedGamesForCurrentUser()
            ]);
            vm.loading = false;
        });
    }
};
</script>

<style lang="scss">
</style>
