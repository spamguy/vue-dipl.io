<template>
    <v-list-tile @click="">
        <router-link :to="'/games/' + game.ID" tag="v-list-tile-content">
            <v-list-tile-title>{{gameDescriptionOrUntitled()}}</v-list-tile-title>
            <v-list-tile-sub-title>{{fullPhaseDescriptionOrGameStatus()}}</v-list-tile-sub-title>
        </router-link>
        <v-list-tile-action>
            <v-dialog v-model="isDialogActive"
                      :fullscreen="$vuetify.breakpoint.xsOnly">
                <v-btn slot="activator" color="primary" dark>Info</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">Details: {{gameDescriptionOrUntitled()}}</span>
                    </v-card-title>
                    <v-card-text>
                        <span>hello</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click.native="joinGame()" flat>Join</v-btn>
                        <v-btn color="primary"
                               @click.native="isDialogActive = false"
                               flat>OK</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-list-tile-action>
    </v-list-tile>
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
        phase: null,
        isDialogActive: false
    }),
    methods: {
        joinGame() {

        }
    },
    async created() {
        const phases = await Phase.getPhasesForGame(this.game.ID);

        // Get last (current) phase.
        this.phase = phases[phases.length - 1];
    }
};
</script>
