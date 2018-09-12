<template>
    <div v-if="gameVariant" :class="{'notStarted': !phase}">
        <svg :id="game.ID" :viewBox="gameVariant.MapDefinition.viewBox">
            <defs>
                <marker id="move"
                        viewBox="0 -5 10 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M0,-5L10,0L0,5" />
                </marker>
                <marker id="moveviaconvoy"
                        viewBox="0 -5 10 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M0,-5L10,0L0,5" />
                </marker>
                <marker id="failedmove"
                        viewBox="0 -5 10 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M0,-5L10,0L0,5" />
                </marker>
                <marker id="failedmoveviaconvoy"
                        viewBox="0 -5 10 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M0,-5L10,0L0,5" />
                </marker>
                <marker id="support"
                        viewBox="-6 -6 12 12"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M 0,0m -5,0a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0" />
                </marker>
                <marker id="failedsupport"
                        viewBox="-6 -6 12 12"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M 0,0m -5,0a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0" />
                </marker>
                <marker id="convoy"
                        viewBox="-1 -5 2 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z" />
                </marker>
                <marker id="failedconvoy"
                        viewBox="-1 -5 2 10"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto">
                    <path d="M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z" />
                </marker>
                <filter id="new"
                        x="-2"
                        y="-2"
                        width="4"
                        height="4">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
            </defs>

            <g id="provinceLayer">
                <map-province v-for="(province, name) in gameVariant.Provinces"
                              :key="name"
                              :mapDefinition="gameVariant.MapDefinition.province(name)"
                              :phaseContext="phase && phase.SCs.find(sc => sc.Province === name)"
                />
            </g>

            <g v-if="phase" id="supplyCentreLayer">
                <map-supply-centre v-for="sc in phase.SCs"
                                   :key="sc.Name"
                                   :sc="sc"
                />
            </g>

            <g v-if="phase" id="unitLayer">
                <map-unit v-for="unit in phase.Units"
                          v-if="provinces[unit.Province]"
                          :key="unit.Province + 'Unit'"
                          :unit="unit"
                          :data="provinces[unit.Province]" />
            </g>

            <g v-if="orders" id="orderLayer">
                <hold-order v-for="order in orders"
                            v-if="order.Parts[1] === 'Hold'"
                            :key="order.Parts[0] + 'Hold'"
                            :province="order.Parts[0]"
                            :x="provinces[order.Parts[0]].x"
                            :y="provinces[order.Parts[0]].y" />
                <move-order v-else-if="order.Parts[1] === 'Move'"
                            :key="order.Parts[0] + 'Move'"
                            :province="order.Parts[0]"
                            :origin-x="provinces[order.Parts[0]].x"
                            :origin-y="provinces[order.Parts[0]].y"
                            :target-x="provinces[order.Parts[2]].x"
                            :target-y="provinces[order.Parts[2]].y" />
            </g>
        </svg>

        <!-- TODO: Display snackbar within map element only. -->
        <v-snackbar v-model="mapDidError" color="red">
            {{mapErrorMessage}}
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MapProvince from './MapProvince';
import MapSupplyCentre from './MapSupplyCentre';
import MapUnit from './MapUnit';

import HoldOrder from './orders/HoldOrder';
import MoveOrder from './orders/MoveOrder';

export default {
    name: 'DiplomacyMap',
    components: {
        'hold-order': HoldOrder,
        'move-order': MoveOrder,
        'map-province': MapProvince,
        'map-supply-centre': MapSupplyCentre,
        'map-unit': MapUnit
    },
    props: {
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        provinces: [],
        mapDidError: false,
        mapErrorMessage: null
    }),
    mounted() {
        /*
         * Take any unhandled SVG groups from the map definition and inject them into the component.
         * Their purposes vary, and the result sucks without them.
         */
        const renderedSVG = document.getElementById(this.game.ID);
        const unknownSVGGroups = this.gameVariant.MapDefinition.unknownSVGGroups();

        // Prepend these groups so they don't render over groups in the template.
        renderedSVG.prepend(...unknownSVGGroups);
    },
    computed: {
        ...mapGetters([
            'game',
            'phase',
            'gameVariant',
            'orders'
        ])
    },
    methods: {
        getSupplyCentreID(sc) {
            return sc.id.substring(0, sc.id.length - 6);
        }
    }
};
</script>

<style lang="scss">
    .notStarted
    {
        opacity: 0.2
    }

    g#supplyCentreLayer
    {
        path
        {
            fill: #fcff57;
            stroke-width: 20px;
            stroke: #000;
        }
    }

    g#unitLayer
    {
        use
        {
            stroke: black;
            stroke-width: 1px;
        }
    }
</style>
