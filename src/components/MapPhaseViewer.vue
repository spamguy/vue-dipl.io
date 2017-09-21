<template>
    <diplomacy-map :game="game" :phase="selectedPhase"></diplomacy-map>
</template>

<script>
    import Phase from '@/api/phase';
    import DiplomacyMap from '@/components/Map';

    export default {
        name: 'mapphaseviewer',
        props: ['game'],
        components: {
            'diplomacy-map': DiplomacyMap
        },
        data() {
            return {
                phases: [ ],
                currentPhaseIndex: 0
            };
        },
        watch: {
            async game() {
                this.phases = await Phase.getPhasesForGame(this.game.ID);
                this.currentPhaseIndex = this.phases.length - 1;
                this.$forceUpdate();
            }
        },
        computed: {
            selectedPhase: () => {
                return this.phases && this.phases.length ? this.phases[this.currentPhaseIndex].Properties : null;
            }
        }
    };
</script>
