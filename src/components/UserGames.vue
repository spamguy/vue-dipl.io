<template>
    <div class="ma-3 elevation-1">
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
        data() {
            return {
                tabs: ['Active', 'Waiting', 'Finished']
            };
        },
        components: {
            'game-list-item': GameListItem
        },
        asyncComputed: {
            activeGames: {
                async get() {
                    const games = await Game.getAllActiveGamesForCurrentUser();
                    return games;
                },
                default: [ ]
            },
            waitingGames: {
                async get() {
                    const games = await Game.getAllStagingGamesForCurrentUser();
                    return games;
                },
                default: [ ]
            },
            finishedGames: {
                async get() {
                    const games = await Game.getAllFinishedGamesForCurrentUser();
                    return games;
                },
                default: [ ]
            }
        }
    };
</script>

<style lang="scss">
</style>
