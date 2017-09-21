<template>
    <div class="ma-2">
        <v-layout row>
            <v-flex>
                <div class="miniMap">
                    <diplomacy-map :game="game" :phase="currentPhase()"></diplomacy-map>
                </div>
            </v-flex>
            <router-link :to="'/games/' + game.ID" class="flex">
                <span>{{game.Desc}}</span>
            </router-link>
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
        asyncComputed: {
            phases: {
                async get() {
                    const phases = await Phase.getPhasesForGame(this.game.ID);
                    return phases;
                },
                watch() { return this.game; }
            }
        },
        methods: {
            currentPhase() { return Phase.getCurrentPhaseForGame(this.phases); }
        }
    };
</script>

<style lang="scss">
    .miniMap
    {
        width: 100px;
    }
</style>
