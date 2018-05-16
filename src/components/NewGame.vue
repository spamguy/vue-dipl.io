<template>
    <v-layout row>
        <v-flex xs12 sm6>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline">Create a game</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="game.isValid">
                        <v-text-field v-model="game.Desc"
                                      label="Name"
                                      required />

                        <!-- TODO: Need something more user friendly here. -->
                        <v-select :items="$store.state.variant.variants.map(v => v.Name)"
                                  v-model="game.Variant"
                                  label="Variant" />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat @click.stop="$router.push('/profile/games')">Cancel</v-btn>
                    <v-btn :disabled="!game.isValid" flat color="primary" @click.stop="submit">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Game from '@/api/game';

export default {
    name: 'NewGame',
    data: () => ({
        game: {
            isValid: false,
            Started: false,
            Closed: false,
            Finished: false,
            Desc: '',
            Variant: 'Classical',
            PhaseLengthMinutes: 60 * 24,
            MinRating: null,
            MaxRating: null
        }
    }),
    methods: {
        async submit() {
            if (!this.$refs.form.validate())
                return;

            let result = await Game.createGame(this.game);
            if (result) {
                this.$router.push({
                    path: '/games/' + result.data.ID,
                    query: { new: '1' }
                });
            }
        }
    }
};
</script>
