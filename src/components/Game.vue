<template>
    <div>
        <h1>{{game.Desc}}</h1>

        <v-container fluid>
            <v-layout v-bind="layout">
                <v-flex md8 sm12>
                    <map-phase-viewer :game="game"></map-phase-viewer>
                </v-flex>
                <v-flex md4 sm12>
                    <v-tabs grow>
                        <v-tabs-bar class="cyan">
                            <v-tabs-item href="#orders">Orders</v-tabs-item>
                            <v-tabs-item href="#press">Press</v-tabs-item>
                        </v-tabs-bar>
                        <v-tabs-items>
                            <v-tabs-content id="orders">
                                <v-card>Hi</v-card>
                            </v-tabs-content>
                        </v-tabs-items>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Game from '@/api/game';
    import MapPhaseViewer from './MapPhaseViewer';
    export default {
        name: 'game',
        components: {
            'map-phase-viewer': MapPhaseViewer
        },
        asyncComputed: {
            game: {
                async get() {
                    const game = Game.getGame(this.$route.params.ID);
                    return game;
                },
                default: { }
            }
        },
        computed: {
            layout() {
                const binding = { };

                if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true;

                return binding;
            }
        }
    };
</script>
