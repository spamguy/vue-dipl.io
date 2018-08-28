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
                <v-btn v-if="!joinBlockReason()" @click.native="joinGame()" flat>Join</v-btn>
                <span class="red--text text--lighten-3 pr-2" v-else>{{joinBlockReason()}}</span>
                <v-btn color="primary"
                       @click.native="closeDetailsDialog()">OK</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="isInnerDialogActive" maxWidth="800">
            <v-card>
                <v-card-title><span class="headline">Really join?</span></v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout column>
                            <v-flex xs12>
                                <draggable class="nationBucket green lighten-4 elevation-5" :list="preferredNationBucket" :options="{group:'nations'}">
                                    <v-chip v-for="preferred in preferredNationBucket" :key="preferred">{{preferred}}</v-chip>
                                </draggable>
                            </v-flex>

                            <v-flex xs12>
                                <draggable class="nationBucket grey lighten-4 elevation-5" :list="mehNationBucket" :options="{group:'nations'}">
                                    <v-chip v-for="meh in mehNationBucket" :key="meh">{{meh}}</v-chip>
                                </draggable>
                            </v-flex>

                            <v-flex xs12>
                                <draggable class="nationBucket red lighten-4 elevation-5" :list="avoidNationBucket" :options="{group:'nations'}">
                                    <v-chip v-for="avoid in avoidNationBucket" :key="avoid">{{avoid}}</v-chip>
                                </draggable>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary"
                           @click.native="closeDetailsDialog()"
                           flat>Cancel</v-btn>
                    <v-btn @click.native="reallyJoinGame()" flat>Join</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters, mapActions } from 'vuex';

import EventBus from '@/utils/EventBus';
import DiplomacyMap from './map/Map';
import GameMixin from '@/mixins/game';

export default {
    name: 'GameListItemDialog',
    mixins: [GameMixin],
    components: {
        'diplomacy-map': DiplomacyMap,
        draggable
    },
    computed: {
        ...mapGetters(['game', 'user', 'gameVariant']),

        layout() {
            const binding = { };

            if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true;

            return binding;
        }
    },
    methods: {
        ...mapActions(['setGameData', 'clearGameData']),

        /**
         * Provides a reason (if any) why the current user can't join the current game.
         */
        joinBlockReason() {
            let reason = null;

            if (this.getUserAsPlayer(this.game, this.user))
                reason = 'you joined already';

            return (reason && `You can't join this game because ${reason}.`) || reason;
        },
        
        /**
         * Opens sub-dialog with custom join options.
         */
        joinGame() {
            this.isInnerDialogActive = true;
        },

        /**
         * Passes user preferences and join request to API.
         */
        reallyJoinGame() {

        },

        closeDetailsDialog() {
            this.isDialogActive = false;
            this.isInnerDialogActive = false;
            this.clearGameData();
        }
    },
    data: () => ({
        isDialogActive: false,
        isInnerDialogActive: false,
        preferredNationBucket: [],
        mehNationBucket: [],
        avoidNationBucket: []
    }),
    created() {
        const vm = this;
        EventBus.$on('details', async(gameID) => {
            await vm.setGameData(gameID);
            vm.isDialogActive = true;
            vm.mehNationBucket = vm.gameVariant.Nations;
        });
    }
};
</script>

<style lang="scss">
    .nationBucket
    {
        border: 1px;
        min-height: 34px;
    }
</style>
