<template>
    <div v-if="game">
        <v-layout column justify-center>
            <v-flex><h1 class="text-xs-center">{{game.Desc}}</h1></v-flex>

            <v-flex>
                <v-layout v-bind="layout">
                    <v-flex md8 sm12 id="mapContainer">
                        <map-phase-viewer :game="game" :phases="phases"></map-phase-viewer>
                    </v-flex>
                    <v-flex fluid>
                        <game-tools :game="game" :phases="phases"></game-tools>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-snackbar
            :timeout="6000"
            v-model="isNew"
            color="green">
            Your new game was created.
        </v-snackbar>
    </div>
</template>

<script>
    import Game from '@/api/game';
    import Phase from '@/api/phase';
    import MapPhaseViewer from './MapPhaseViewer';
    import GameTools from './GameTools';

    export default {
        name: 'game',
        components: {
            'map-phase-viewer': MapPhaseViewer,
            'game-tools': GameTools
        },
        data() {
            return {
                isNew: false,
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
        mounted() {
            if (this.$route.query.new)
                this.isNew = true;
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

<style lang="scss">
    #mapContainer
    {
        max-width: 700px;
    }
</style>
