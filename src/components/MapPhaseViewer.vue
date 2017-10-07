<template>
    <div>
        <v-toolbar dense>
            <v-toolbar-title>{{mapHeader()}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-for="action in availableActions" :key="action.icon"></v-btn>
        </v-toolbar>
        <diplomacy-map :game="game" :phase="currentPhase()"></diplomacy-map>
        <v-toolbar dense v-if="game.Started">
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
