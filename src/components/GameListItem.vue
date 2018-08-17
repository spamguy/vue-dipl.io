<template>
    <v-list-tile @click="">
        <router-link :to="'/games/' + game.ID" tag="v-list-tile-content">
            <v-list-tile-title>{{gameDescriptionOrUntitled()}}</v-list-tile-title>
            <v-list-tile-sub-title>{{fullPhaseDescriptionOrGameStatus()}}</v-list-tile-sub-title>
        </router-link>
        <v-list-tile-action>
            <v-btn @click.prevent="openDetailsDialog(game.ID)">Info</v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
import EventBus from '@/utils/EventBus';
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
    methods: {
        joinGame() {

        },

        /**
         * Emits an event to open the details dialog.
         * @param {String} gameID The game ID.
         */
        openDetailsDialog(gameID) {
            EventBus.$emit('details', gameID);
        }
    },
    async created() {
        const phases = await Phase.getPhasesForGame(this.game.ID);

        // Get last (current) phase.
        this.phase = phases[phases.length - 1];
    }
};
</script>
