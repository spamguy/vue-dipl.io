<template>
    <div class="ma-2">
        <v-layout row>
            <v-flex>
                <div class="miniMap">
                    <diplomacy-map :game="game" :phase="phase"></diplomacy-map>
                </div>
            </v-flex>
            <router-link :to="'/games/' + game.ID" class="flex">
                <span>{{game.Desc || 'Untitled game'}}</span>
            </router-link>
        </v-layout>
    </div>
</template>

<script>
    import Phase from '@/api/phase';
    import DiplomacyMap from '@/components/Map';

    export default {
        name: 'gamelistitem',
        props: ['game'],
        components: {
            'diplomacy-map': DiplomacyMap
        },
        data: () => ({
            phase: null
        }),
        async created() {
            const phases = await Phase.getPhasesForGame(this.game.ID);
            this.phase = Phase.getCurrentPhaseForGame(phases);
        }
    };
</script>

<style lang="scss">
    .miniMap
    {
        width: 100px;
    }
</style>
