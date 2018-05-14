<template>
    <div class="elevation-1">
        <v-tabs>
            <v-tab v-for="tab in tabs"
                   :key="tab"
                   :href="'#' + tab"
                   ripple>
                {{tab}}
            </v-tab>
            <v-tabs-items>
                <v-tab-item id="Active">
                    <v-progress-circular v-if="loading" :size="50" indeterminate color="primary" />
                    <div v-else-if="!activeGames.length" class="display-2 text-xs-center my-5">Nothing here.</div>
                    <v-list v-else two-line>
                        <game-list-item v-for="game in activeGames"
                                        :key="game.Properties.Id"
                                        :game="game.Properties" />
                    </v-list>
                </v-tab-item>
                <v-tab-item id="Waiting">
                    <v-progress-circular v-if="loading" :size="50" indeterminate color="primary" />
                    <div v-else-if="!waitingGames.length" class="display-2 text-xs-center my-5">Nothing here.</div>
                    <v-list v-else two-line>
                        <game-list-item v-for="game in waitingGames"
                                        :key="game.Properties.Id"
                                        :game="game.Properties" />
                    </v-list>
                </v-tab-item>
                <v-tab-item id="Finished">
                    <v-progress-circular v-if="loading" :size="50" indeterminate color="primary" />
                    <div v-else-if="!finishedGames.length" class="display-2 text-xs-center my-5">Nothing here.</div>
                    <v-list v-else two-line>
                        <game-list-item v-for="game in finishedGames"
                                        :key="game.Properties.Id"
                                        :game="game.Properties" />
                    </v-list>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </div>
</template>

<script>
import Game from '@/api/game';
import GameListItem from '@/components/GameListItem';

export default {
    name: 'UserGames',
    components: {
        'game-list-item': GameListItem
    },
    data: () => ({
        tabs: ['Active', 'Waiting', 'Finished'],
        finishedGames: [],
        waitingGames: [],
        activeGames: [],
        loading: true
    }),
    async beforeRouteEnter(to, from, next) {
        next(async(vm) => {
            const result = await Promise.all([
                Game.getAllActiveGamesForCurrentUser(),
                Game.getAllStagingGamesForCurrentUser(),
                Game.getAllFinishedGamesForCurrentUser()
            ]);
            vm.setData(result);
        });
    },
    methods: {
        setData(result) {
            this.activeGames = result[0];
            this.waitingGames = result[1];
            this.finishedGames = result[2];
            this.loading = false;
        }
    }
};
</script>

<style lang="scss">
</style>
