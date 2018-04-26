<template>
    <div v-if="phase" class="elevation-1">
        <v-toolbar dark dense flat color="primary">
            <v-toolbar-title>{{mapHeader()}}</v-toolbar-title>
            <v-spacer />
            <map-order-menu v-if="phase.PhaseOrdinal === lastPhaseOrdinal"
                            :phase-type="phase.Type" />
        </v-toolbar>
        <diplomacy-map :readonly="false" />
        <v-toolbar v-if="game.Started"
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

export default {
    name: 'MapPhaseViewer',
    components: {
        'diplomacy-map': DiplomacyMap,
        'map-order-menu': MapOrderMenu
    },
    computed: {
        ...mapGetters(['game', 'phase', 'lastPhaseOrdinal'])
    },
    methods: {
        mapHeader() {
            if (this.phase)
                return this.phase.Season + ' ' + this.phase.Type + ' ' + this.phase.Year;
            else if (!this.game.Started)
                return '[not started]';
        }
    }
};
</script>
