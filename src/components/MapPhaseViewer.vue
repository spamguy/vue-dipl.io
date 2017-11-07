<template>
    <div class="elevation-1">
        <v-toolbar dark dense flat color="primary">
            <v-toolbar-title>{{mapHeader()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-for="action in availableActions" :key="action.icon"></v-btn>
        </v-toolbar>
        <diplomacy-map :readonly="false" :game="game" :phase="currentPhase()"></diplomacy-map>
        <v-toolbar dark dense flat class="white--text" color="primary" v-if="game.Started">
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex = 0">
                <v-icon>first_page</v-icon>
            </v-btn>
            <v-btn icon :disabled="!currentPhaseIndex" @click="currentPhaseIndex--">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon :disabled="currentPhaseIndex === phases.length - 1" @click="currentPhaseIndex++">
                <v-icon>chevron_right</v-icon>
            </v-btn>
            <v-btn icon :disabled="currentPhaseIndex === phases.length - 1" @click="currentPhaseIndex = phases.length - 1">
                <v-icon>last_page</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import DiplomacyMap from '@/components/Map';

    export default {
        name: 'mapphaseviewer',
        props: ['game', 'phases'],
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
            currentPhase() {
                return this.phases && this.phases.length ? this.phases[this.currentPhaseIndex].Properties : null;
            },
            mapHeader() {
                const currentPhase = this.currentPhase();
                if (currentPhase)
                    return currentPhase.Season + ' ' + currentPhase.Type + ' ' + currentPhase.Year;
                else if (!this.game.Started)
                    return '[not started]';
            }
        }
    };
</script>
