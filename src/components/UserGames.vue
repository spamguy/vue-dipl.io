<template>
    <div class="elevation-1">
        <v-tabs dark>
            <v-tabs-bar>
                <v-tabs-item
                    v-for="tab in tabs"
                    :key="tab"
                    :href="'#' + tab"
                    ripple
                >
                    {{tab}}
                </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
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
            </v-tabs-items>
        </v-tabs>
    </div>
</template>

<script>
    import Game from '@/api/game';
    import GameListItem from '@/components/GameListItem';

    export default {
        name: 'usergames',
        data: () => ({
            tabs: ['Active', 'Waiting', 'Finished'],
            finishedGames: [],
            waitingGames: [],
            activeGames: []
        }),
        components: {
            'game-list-item': GameListItem
        },
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
            }
        }
    };
</script>

<style lang="scss">
</style>
