<template>
    <div v-if="game">
        <v-layout column justify-center>
            <v-flex><h2 class="display-3 text-xs-center">{{game.Desc}}</h2></v-flex>

            <v-flex>
                <v-container fluid>
                    <v-layout v-bind="layout">
                        <v-flex sm8 xs12 id="mapContainer" class="mr-2 mb-2">
                            <map-phase-viewer></map-phase-viewer>
                        </v-flex>
                        <v-flex fluid class="mr-2 mb-2">
                            <game-tools></game-tools>
                        </v-flex>
                    </v-layout>
                </v-container>
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
    import { mapGetters, mapActions } from 'vuex';

    import MapPhaseViewer from './MapPhaseViewer';
    import GameTools from './GameTools';

    export default {
        name: 'game',
        components: {
            'map-phase-viewer': MapPhaseViewer,
            'game-tools': GameTools
        },
        data: () => ({
            isNew: false
        }),
        created() {
            if (this.$route.query.new)
                this.isNew = true;
            this.setGameData(this.$route.params.ID, this.$route.params.ordinal);
        },
        methods: {
            ...mapActions(['setGameData'])
        },
        computed: {
            ...mapGetters(['game']),
            layout() {
                const binding = { };

                if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true;

                return binding;
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
