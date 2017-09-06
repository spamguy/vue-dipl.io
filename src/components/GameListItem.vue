<template>
    <div class="miniMap">
        <diplomacy-map :game="game" :phase="currentPhase"></diplomacy-map>
    </div>
</template>

<script>
    import DiplomacyMap from '@/components/Map';
    import Phase from '../api/phase';

    export default {
        name: 'gamelistitem',
        props: ['game'],
        components: {
            'diplomacy-map': DiplomacyMap
        },
        data() {
            return {
                currentPhase: null
            };
        },
        asyncComputed: {
            async phases() {
                const phases = await Phase.getPhasesForGame(this.game);
                return phases;
            }
        },
        watch: {
            phases() {
                this.currentPhase = Phase.getCurrentPhaseForGame(this.phases);
            }
        }
    };
</script>

<style lang="scss">
</style>
