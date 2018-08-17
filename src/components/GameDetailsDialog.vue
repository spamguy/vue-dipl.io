<template>
    <v-dialog v-model="isDialogActive"
              maxWidth="600"
              :fullscreen="$vuetify.breakpoint.xsOnly"
              lazy>
        <v-card>
            <v-card-title>
                <span class="headline">Details: {{gameDescriptionOrUntitled()}}</span>
            </v-card-title>
            <v-card-text>
                <diplomacy-map :readonly="true" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn v-if="!getUserAsPlayer(game, user)" @click.native="joinGame()" flat>Join</v-btn>
                <v-btn color="primary"
                       @click.native="closeDetailsDialog()"
                       flat>OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import EventBus from '@/utils/EventBus';
import DiplomacyMap from './map/Map';
import GameMixin from '@/mixins/game';

export default {
    name: 'GameListItemDialog',
    mixins: [GameMixin],
    components: {
        'diplomacy-map': DiplomacyMap
    },
    computed: {
        ...mapGetters(['game', 'user']),
    },
    methods: {
        ...mapActions(['setGameData', 'clearGameData']),
        joinGame() {

        },

        closeDetailsDialog() {
            this.isDialogActive = false;
            this.clearGameData();
        }
    },
    data: () => ({
        isDialogActive: false
    }),
    created() {
        const vm = this;
        EventBus.$on('details', async(gameID) => {
            await vm.setGameData(gameID);
            vm.isDialogActive = true;
        });
    }
};
</script>
