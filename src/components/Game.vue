<template>
    <div v-if="gameVariant">
        <v-layout column justify-center>
            <v-flex>
                <div class="display-3 text-xs-center">{{gameDescriptionOrUntitled()}}</div>
                <div class="display-1 text-xs-center">
                    <div v-if="game.Finished">
                        {{fullGameStatus()}}
                    </div>

                    <div v-if="game.Started && currentPlayer">
                        Playing as {{currentPlayer.Nation}}
                    </div>
                    <div v-else-if="!game.Started && currentPlayer">
                        (Joined; waiting for {{missingPlayers}}...)
                    </div>
                    <div v-else>
                        Spectating
                    </div>
                </div>
            </v-flex>
            <v-flex>
                <v-container fluid>
                    <v-layout v-bind="layout">
                        <v-flex id="mapContainer" class="mr-2 mb-2" sm8 xs12>
                            <map-phase-viewer />
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
import pluralize from 'pluralize';

import MapPhaseViewer from './MapPhaseViewer';
import GameTools from './GameTools';
import GameMixin from '@/mixins/game';

export default {
    name: 'Game',
    components: {
        'map-phase-viewer': MapPhaseViewer,
        'game-tools': GameTools
    },
    mixins: [GameMixin],
    data() {
        return {
            isNew: false,
            colour: '#000',
            currentPlayer: null
        };
    },
    computed: {
        ...mapGetters([
            'game',
            'user',
            'gameVariant',
            'currentPlayer'
        ]),
        layout() {
            const binding = { };

            if (!this.$vuetify.breakpoint.mdAndUp)
                binding.column = true;

            return binding;
        },
        missingPlayers() {
            const missingPlayerCount = this.gameVariant.Nations.length - this.game.Members.length;
            return `${missingPlayerCount} more ${pluralize('player', missingPlayerCount)}`;
        }
    },
    watch: {
        async $route(to, from) {
            // Catch in-game phase navigation, and load relevant data.
            if (to.params.ID === from.params.ID)
                await this.setOrdinal({ ID: to.params.ID, ordinal: to.params.ordinal });
        }
    },
    beforeRouteLeave(to, from, next) {
        this.clearGameData();
        next();
    },
    async created() {
        if (this.$route.query.new)
            this.isNew = true;

        const { ID, ordinal } = this.$route.params;
        await this.setGameData(ID);
        await this.setOrdinal({ ID, ordinal });
    },
    methods: {
        ...mapActions(['setGameData', 'clearGameData', 'setOrdinal'])
    }
};
</script>

<style lang="scss">
    #mapContainer
    {
        max-width: 700px;
    }
</style>
