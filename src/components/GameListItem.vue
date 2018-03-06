<template>
    <v-container grid-list-md fluid class="gameListItemContainer">
        <v-layout row>
            <v-flex xs1>
                <!-- TODO: Reinstitute map as a hover. -->
                <!-- <diplomacy-map :readonly="true" :game="game" :phase="phase"></diplomacy-map> -->
            </v-flex>

            <!-- Making router-link a flexbox so the whole region triggers a redirect. -->
            <router-link :to="'/games/' + game.ID" class="flex xs11 gameDetails">
                <h5 class="headline">{{game.Desc || 'Untitled game'}}</h5>
            </router-link>
        </v-layout>
    </v-container>
</template>

<script>
import Phase from '@/api/phase';

export default {
    name: 'GameListItem',
    props: {
        game: {
            type: Object,
            required: true
        }
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
