<template>
    <router-link :to="'/games/' + game.ID" tag="div">
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
