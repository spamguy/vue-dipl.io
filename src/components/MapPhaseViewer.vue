<template>
    <diplomacy-map :game="game" :phase="this.phases[this.currentPhaseIndex]"></diplomacy-map>
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
                currentPhaseIndex: 0
            };
        },
        asyncComputed: {
            phases: {
                async get() {
                    if (!this.game.ID)
                        return [ ];
                    const phases = await Phase.getPhasesForGame(this.game.ID);
                    return phases;
                },
                default: [ ],
                watch() { return this.game; }
            }
        },
        computed: {
            selectedPhase: () => {
                return this.phases && this.phases.length ? this.phases[this.currentPhaseIndex] : null;
            }
        }
    };
</script>
