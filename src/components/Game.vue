<template>
    <div v-if="game">
        <v-layout column justify-center>
            <v-flex>
                <h2 class="display-3 text-xs-center">{{game.Desc}}</h2>
                <h3 class="display-1 text-xs-center" v-if="currentUserAsPlayer">Playing as {{currentUserAsPlayer.Nation}}</h3>
                <h3 class="display-1 text-xs-center" v-else>Spectating</h3>
            </v-flex>
            <v-flex>
                <v-container fluid>
                    <v-layout v-bind="layout">
                        <v-flex sm8 xs12 id="mapContainer" class="mr-2 mb-2">
                            <map-phase-viewer :promise="gameDataPromise" />
                        </v-flex>
                        <v-flex fluid class="mr-2 mb-2">
                            <game-tools />
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
    name: 'Game',
    components: {
        'map-phase-viewer': MapPhaseViewer,
        'game-tools': GameTools
    },
    data() {
        return {
            isNew: false,
            gameDataPromise: this.setGameData(this.$route.params.ID, this.$route.params.ordinal),
            colour: '#000'
        };
    },
    computed: {
        ...mapGetters(['game', 'mapDefinition', 'currentUserAsPlayer']),
        layout() {
            const binding = { };

            if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true;

            return binding;
        }
    },
    mounted() {
        if (this.$route.query.new)
            this.isNew = true;
    },
    methods: {
        ...mapActions(['setGameData'])
    }
};
</script>

<style lang="scss">
    #mapContainer
    {
        max-width: 700px;
    }
</style>
