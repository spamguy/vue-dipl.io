<template>
    <div class="elevation-1">
        <v-toolbar dark dense flat color="primary">
            <v-toolbar-title>{{mapHeader()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-for="action in availableActions" :key="action.icon"></v-btn>
        </v-toolbar>
        <diplomacy-map :readonly="false"></diplomacy-map>
        <v-toolbar dark dense flat class="white--text" color="primary" v-if="game.Started">
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex = 0">
                <v-icon>first_page</v-icon>
            </v-btn>
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex--">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon :disabled="currentPhaseIndex === lastPhaseOrdinal" @click="currentPhaseIndex++">
                <v-icon>chevron_right</v-icon>
            </v-btn>
            <v-btn icon :disabled="currentPhaseIndex === lastPhaseOrdinal" @click="currentPhaseIndex = phases.length - 1">
                <v-icon>last_page</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import DiplomacyMap from '@/components/Map';
    import { mapGetters } from 'vuex';

    export default {
        name: 'mapphaseviewer',
        components: {
            'diplomacy-map': DiplomacyMap
        },
        data() {
            return {
                currentPhaseIndex: 0,
                availableActions: []
            };
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
        },
        computed: {
            ...mapGetters(['game', 'phase', 'lastPhaseOrdinal'])
        }
    };
</script>
