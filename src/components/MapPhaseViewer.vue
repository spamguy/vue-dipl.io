<template>
    <diplomacy-map :game="game" :phase="this.phases && this.phases.length ? this.phases[this.currentPhaseIndex].Properties : null"></diplomacy-map>
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
                currentPhaseIndex: 0
            };
        }
    };
</script>
