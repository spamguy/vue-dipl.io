<template>
    <v-tabs grow class="elevation-1">
        <v-tab :disabled="!game.Started" href="#orders">Orders</v-tab>
        <v-tab :disabled="!game.Started" href="#press">Press</v-tab>
        <v-tab :disabled="!game.Started" href="#actions">Actions</v-tab>
        <v-tabs-items>
            <v-tab-item id="orders">
                <v-list v-if="phase" subheader dense>
                    <div v-for="power in gameVariant.Nations" :key="power + 'UnitSection'">
                        <v-subheader class="nationSubheader">{{power}}</v-subheader>
                        <province-list-item v-for="unit in provinceListItemsForPower(power)"
                                            :key="unit.Province"
                                            :unit="unit" />
                    </div>
                </v-list>
                <div v-else-if="game.Started === false" class="headline text-xs-center my-5">
                    The game has not started yet.
                </div>
            </v-tab-item>
            <v-tab-item id="press">
                <v-card>there</v-card>
            </v-tab-item>
            <v-tab-item id="actions">
                <v-card>buddy</v-card>
            </v-tab-item>
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
        ...mapGetters(['game', 'gameVariant', 'phase', 'orders']),

        /**
         * Filters province list items by owning power.
         * @param power [string] The owning power to match against.
         */
        provinceListItemsForPower(power) {
            const units = this.phase.Units;
            return units.filter(u => u.Unit.Nation === power);
        }
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
