<template>
    <div v-if="game">
        <h1>{{game.Desc}}</h1>

        <v-container fluid>
            <v-layout v-bind="layout">
                <v-flex md8 sm12>
                    <map-phase-viewer :game="game" :phases="phases"></map-phase-viewer>
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
                            <v-tabs-content id="press">
                                <v-card>there</v-card>
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
    import Phase from '@/api/phase';
    import MapPhaseViewer from './MapPhaseViewer';

    export default {
        name: 'game',
        components: {
            'map-phase-viewer': MapPhaseViewer
        },
        data() {
            return {
                game: null,
                phases: []
            };
        },
        async beforeRouteEnter(to, from, next) {
            const result = await Promise.all([
                Game.getGame(to.params.ID),
                Phase.getPhasesForGame(to.params.ID)
            ]);
            next(vm => vm.setData(result));
        },
        computed: {
            layout() {
                const binding = { };

                if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true;

                return binding;
            }
        },
        methods: {
            setData(result) {
                this.game = result[0];
                this.phases = result[1];
            }
        }
    };
</script>
