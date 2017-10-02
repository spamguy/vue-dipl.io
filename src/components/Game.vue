<template>
    <div>
        <h1>{{game.Desc}}</h1>

        <v-container fluid>
            <v-layout v-bind="layout">
                <v-flex sm8 xs12>
                    <map-phase-viewer :game="game"></map-phase-viewer>
                </v-flex>
                <v-flex sm4 xs12>
                    <div style="border:1px solid green">
                        <!-- TODO: Game tools go here -->
                    </div>
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
