<template>
    <v-tabs grow class="elevation-1">
        <v-tabs-bar color="primary">
            <v-tabs-item :disabled="!game.Started" href="#orders">Orders</v-tabs-item>
            <v-tabs-item :disabled="!game.Started" href="#press">Press</v-tabs-item>
            <v-tabs-item :disabled="!game.Started" href="#actions">Actions</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
            <v-tabs-content id="orders">
                <v-list v-if="game.Started" subheader dense>
                    <div v-for="power in gameVariant.Nations" :key="power + 'UnitSection'">
                        <v-subheader class="nationSubheader">{{power}}</v-subheader>
                        <province-list-item v-for="unit in phase.Units"
                                            v-if="unit.Unit.Nation === power"
                                            :key="unit.Province"
                                            :unit="unit" />
                    </div>
                </v-list>
                <h1 v-else-if="game.Started === false">The game has not started yet.</h1>
            </v-tabs-content>
            <v-tabs-content id="press">
                <v-card>there</v-card>
            </v-tabs-content>
            <v-tabs-content id="actions">
                <v-card>buddy</v-card>
            </v-tabs-content>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
import ProvinceListItem from './ProvinceListItem';

export default {
    name: 'GameTools',
    components: {
        'province-list-item': ProvinceListItem
    },
    computed: {
        ...mapGetters(['game', 'gameVariant', 'phase', 'orders'])
    }
};
</script>

<style lang="scss">
    #orders
    {
        h1
        {
            text-align: center;
        }

        .nationSubheader
        {
            background-color: #eee;
            font-size: 110%;
        }
    }
</style>
