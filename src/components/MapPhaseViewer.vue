<template>
    <div class="elevation-1">
        <v-toolbar dark dense flat color="primary">
            <v-toolbar-title>{{mapHeader()}}</v-toolbar-title>
            <v-spacer />
            <map-order-menu phase-type="phase.Type" />
        </v-toolbar>
        <diplomacy-map :readonly="false" :promise="promise" />
        <v-toolbar dark
                   dense
                   flat
                   class="white--text"
                   color="primary"
                   v-if="game.Started">
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex = 0">
                <v-icon>first_page</v-icon>
            </v-btn>
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex--">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn icon :disabled="currentPhaseIndex === lastPhaseOrdinal - 1" @click="currentPhaseIndex++">
                <v-icon>chevron_right</v-icon>
            </v-btn>
            <v-btn icon :disabled="currentPhaseIndex === lastPhaseOrdinal - 1" @click="currentPhaseIndex = phases.length - 1">
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
    props: {
        promise: {
            type: Promise,
            required: true
        }
    },
    data: () => ({
        currentPhaseIndex: 0,
        availableActions: []
    }),
    computed: {
        ...mapGetters(['game', 'phase', 'lastPhaseOrdinal'])
    },
    watch: {
        currentPhaseIndex(newCPI) {
            this.$forceUpdate();
        }
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
