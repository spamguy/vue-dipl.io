<template>
    <div class="ma-2">
        <v-layout row>
            <v-flex>
                <div class="miniMap">
                    <diplomacy-map :game="game" :phase="currentPhase"></diplomacy-map>
                </div>
            </v-flex>
            <v-flex>
                <span>{{game.Desc}}</span>
            </v-flex>
        </v-layout>
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
                const phases = await Phase.getPhasesForGame(this.game.ID);
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
    .miniMap
    {
        width: 100px;
    }
</style>
