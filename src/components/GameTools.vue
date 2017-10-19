<template>
    <v-tabs grow class="elevation-1">
        <v-tabs-bar class="cyan">
            <v-tabs-item href="#orders">Orders</v-tabs-item>
            <v-tabs-item href="#press">Press</v-tabs-item>
            <v-tabs-item href="#actions">Actions</v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
            <v-tabs-content id="orders">
                <v-list subheader v-if="game.Started" dense>
                    <div v-for="power in variant.Nations" :key="power + 'UnitSection'">
                        <v-subheader class="nationSubheader">{{power}}</v-subheader>
                        <province-list-item
                            v-for="unit in getCurrentPhase().Units"
                            v-if="unit.Unit.Nation === power"
                            :key="unit.Province"
                            :unit="unit">
                        </province-list-item>
                    </div>
                </v-list>
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
    import Variant from '@/api/variant';
    import Phase from '@/api/phase';
    import ProvinceListItem from './ProvinceListItem';

    export default {
        name: 'gametools',
        props: ['game', 'phases'],
        components: {
            'province-list-item': ProvinceListItem
        },
        data: () => ({
            variant: { }
        }),
        created() {
            this.variant = Variant.getVariant(this.game.Variant);
        },
        methods: {
            getCurrentPhase() {
                return Phase.getCurrentPhaseForGame(this.phases);
            }
        }
    };
</script>

<style lang="scss">
    #orders
    {
        .nationSubheader
        {
            background-color: #eee;
        }
    }
</style>
