<template>
    <router-link :to="'/games/' + game.ID" tag="div">
        <!-- eslint-disable-next-line vue/valid-v-on -->
        <v-list-tile @click="">
            <v-list-tile-content>
                <v-list-tile-title>{{gameDescriptionOrUntitled()}}</v-list-tile-title>
                <v-list-tile-sub-title>{{fullPhaseDescriptionOrGameStatus()}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </router-link>
    <!-- <v-container grid-list-md fluid class="gameListItemContainer">
        <v-layout row>
            <v-flex xs1>
                TODO: Reinstitute map as a hover.
                <diplomacy-map :readonly="true" :game="game" :phase="phase"></diplomacy-map>
            </v-flex>

            Making router-link a flexbox so the whole region triggers a redirect.
            <router-link :to="'/games/' + game.ID" class="flex xs11 gameDetails">
                <div class="display-1">{{game.Desc || 'Untitled game'}}</div>
                <div class="subheading">{{fullPhaseDescriptionOrGameStatus()}}</div>
            </router-link>
        </v-layout>
    </v-container>-->
</template>

<script>
import Phase from '@/api/phase';
import GameMixin from '@/mixins/game';

export default {
    name: 'GameListItem',
    mixins: [GameMixin],
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
        if (this.phase)
            this.phase = this.phase.Properties;
    }
};
</script>
