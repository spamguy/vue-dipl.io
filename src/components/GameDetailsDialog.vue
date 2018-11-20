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
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout column>
                            <v-flex>
                                <!-- eslint-disable -->
                                <v-alert type="info" :value="true">
                                    <span>By joining this game, you agree to:</span>

                                    <ul>
                                        <li>play to the end.</li>
                                        <li>play with quality.</li>
                                        <li>consistently meet deadlines (every {{game.PhaseLengthMinutes}} minutes).</li>
                                    </ul>

                                    <span>Failure to meet these expectations risks bans from future games.</span>
                                </v-alert>
                            </v-flex>
                            <!-- eslint-enable -->

                            <v-flex><h5 class="headline">Player Preferences</h5></v-flex>

                            <v-flex>
                                <v-combobox v-if="gameVariant"
                                            v-model="preferredNations"
                                            label="Preferred nations (if any)"
                                            :items="gameVariant.Nations"
                                            :search-input.sync="nationSearch"
                                            multiple
                                            chips>
                                    <template slot="selection" slot-scope="data">
                                        <v-chip class="v-chip--select-multi"
                                                :color="colours[data.item]"
                                                :selected="data.selected"
                                                :key="JSON.stringify(data.item)"
                                                @input="data.parent.selectItem(data.item)">
                                            {{data.item}}
                                        </v-chip>
                                    </template>
                                </v-combobox>
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
import { mapGetters, mapActions } from 'vuex';

import Colours from '@/utils/Colours';
import Game from '@/api/game';
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
        ...mapGetters(['game', 'user', 'gameVariant'])
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
        async reallyJoinGame() {
            const options = { };
            if (this.useAlias)
                options.GameAlias = this.gameAlias;
            if (this.preferredNations.length < this.gameVariant.Nations.length)
                options.NationPreferences = this.preferredNations.join(',');

            // TODO: Error handling.
            await Game.joinGame(this.game.ID, options);

            this.$router.push({
                name: 'game',
                params: { ID: this.game.ID }
            });
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
        preferredNations: [],
        nationSearch: '',
        colours: { },
        useAlias: false,
        gameAlias: ''
    }),
    created() {
        const vm = this;
        EventBus.$on('details', async (gameID) => {
            await vm.setGameData(gameID);
            vm.isDialogActive = true;
            vm.colours = Colours.getColourSetForVariant(vm.gameVariant);
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
