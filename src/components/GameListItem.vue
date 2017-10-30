<template>
    <v-container grid-list-md fluid class="gameListItemContainer">
        <v-layout row>
            <v-flex xs1>
                <diplomacy-map :game="game" :phase="phase"></diplomacy-map>
            </v-flex>

            <!-- Making router-link a flexbox so the whole region triggers a redirect. -->
            <router-link :to="'/games/' + game.ID" class="flex xs11 gameDetails">
                <h4>{{game.Desc || 'Untitled game'}}</h4>
            </router-link>
        </v-layout>
    </v-container>
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
    .gameListItemContainer .gameDetails
    {
        text-decoration: none;
        color: #000;

        &:hover
        {
            color: #8ea8ec;
        }
    }
</style>
