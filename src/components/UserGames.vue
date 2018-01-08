<template>
    <div class="elevation-1">
        <v-tabs>
            <v-tabs-bar color="primary">
                <v-tabs-item v-for="tab in tabs"
                             :key="tab"
                             :href="'#' + tab"
                             ripple>
                    {{tab}}
                </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
                <v-tabs-content id="Active">
                    <v-layout column justify-center>
                        <v-flex>
                            <v-progress-circular v-if="loading" indeterminate :size="50" color="primary" />
                            <div v-if="!loading && !activeGames.length">Nothing here.</div>

                            <game-list-item v-for="game in activeGames"
                                            :key="game.Properties.Id"
                                            :game="game.Properties" />
                        </v-flex>
                    </v-layout>
                </v-tabs-content>
                <v-tabs-content id="Waiting">
                    <v-layout column justify-center>
                        <v-flex>
                            <v-progress-circular v-if="loading" indeterminate :size="50" color="primary" />
                            <div v-if="!loading && !waitingGames.length">Nothing here.</div>

                            <game-list-item v-for="game in waitingGames"
                                            :key="game.Properties.Id"
                                            :game="game.Properties" />
                        </v-flex>
                    </v-layout>
                </v-tabs-content>
                <v-tabs-content id="Finished">
                    <v-layout column justify-center>
                        <v-flex>
                            <v-progress-circular v-if="loading" indeterminate :size="50" color="primary" />
                            <div v-if="!loading && !finishedGames.length">Nothing here.</div>

                            <game-list-item v-for="game in finishedGames"
                                            :key="game.Properties.Id"
                                            :game="game.Properties" />
                        </v-flex>
                    </v-layout>
                </v-tabs-content>
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
            if (to.query.token)
                vm.$localStorage.set('token', to.query.token);
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
            this.finishedGames = result[1];
            this.waitingGames = result[2];
            this.loading = false;
        }
    }
};
</script>

<style lang="scss">
</style>
