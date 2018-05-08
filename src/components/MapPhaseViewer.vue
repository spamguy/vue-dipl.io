<template>
    <div class="elevation-1">
        <v-toolbar v-if="phase"
                   dark
                   dense
                   flat
                   color="primary">
            <v-toolbar-title>{{fullPhaseDescription()}}</v-toolbar-title>
            <v-spacer />
            <map-order-menu v-if="game.Started && !game.Finished && phase.PhaseOrdinal === lastPhaseOrdinal"
                            :phase-type="phase.Type" />
        </v-toolbar>
        <diplomacy-map :readonly="false" />
        <v-toolbar v-if="phase && game.Started"
                   dark
                   dense
                   flat
                   class="white--text"
                   color="primary">
            <v-btn :disabled="phase.PhaseOrdinal === 1"
                   :to="{ params: { ID: game.ID, ordinal: 1 } }"
                   icon>
                <v-icon>first_page</v-icon>
            </v-btn>
            <v-btn :disabled="phase.PhaseOrdinal === 1"
                   :to="{ params: { ID: game.ID, ordinal: phase.PhaseOrdinal - 1 } }"
                   icon>
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn :disabled="phase.PhaseOrdinal === lastPhaseOrdinal"
                   :to="{ params: { ID: game.ID, ordinal: phase.PhaseOrdinal + 1 } }"
                   icon>
                <v-icon>chevron_right</v-icon>
            </v-btn>
            <v-btn :disabled="phase.PhaseOrdinal === lastPhaseOrdinal"
                   :to="{ params: { ID: game.ID, ordinal: undefined } }"
                   icon>
                <v-icon>last_page</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import DiplomacyMap from '@/components/map/Map';
import MapOrderMenu from '@/components/map/MapOrderMenu';
import GameMixin from '@/mixins/game';

export default {
    name: 'MapPhaseViewer',
    components: {
        'diplomacy-map': DiplomacyMap,
        'map-order-menu': MapOrderMenu
    },
    mixins: [GameMixin],
    computed: {
        ...mapGetters(['game', 'phase', 'lastPhaseOrdinal'])
    }
};
</script>
