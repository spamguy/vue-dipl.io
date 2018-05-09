<template>
    <div :class="{'notStarted': !phase}">
        <svg :id="game.ID" :viewBox="viewBox" height="100%" width="100%">
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
                <map-province v-for="(provinceData, key) in provinces"
                              :key="key"
                              :id="key"
                              :data="provinceData" />
            </g>

            <g v-if="phase" id="supplyCentreLayer">
                <map-supply-centre v-for="sc in SCs"
                                   v-if="provinces[sc.Name]"
                                   :key="sc.Name + 'Center'"
                                   :id="sc.Name + 'Center'"
                                   :data="provinces[sc.Name]" />
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
                            v-if="order.Properties.Parts[1] === 'Hold'"
                            :key="order.Properties.Parts[0] + 'Hold'"
                            :province="order.Properties.Parts[0]"
                            :x="provinces[order.Properties.Parts[0]].x"
                            :y="provinces[order.Properties.Parts[0]].y" />
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
import Colours from '@/utils/colours';
import MapProvince from './MapProvince';
import MapSupplyCentre from './MapSupplyCentre';
import MapUnit from './MapUnit';

import HoldOrder from './orders/HoldOrder';

export default {
    name: 'DiplomacyMap',
    components: {
        'hold-order': HoldOrder,
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
        provinces: { },
        mapDidError: false,
        mapErrorMessage: null
    }),
    computed: {
        ...mapGetters([
            'game',
            'gameIsLoaded',
            'phase',
            'gameVariant',
            'orders'
        ]),
        viewBox() {
            let width = 0,
                height = 0,
                viewBox = null;
            if (this.mapDefinition) {
                width = this.mapDefinition.getAttribute('width');
                height = this.mapDefinition.getAttribute('height');
                viewBox = this.mapDefinition.getAttribute('viewBox');
            }

            return viewBox || `0 0 ${width} ${height}`;
        },
        SCs() {
            return this.gameVariant.Graph ? Object.values(this.gameVariant.Graph.Nodes).filter(n => n.SC) : [];
        },
        mapDefinition() {
            if (!this.gameVariant.MapString)
                return null;

            const parser = new DOMParser();
            return parser.parseFromString(this.gameVariant.MapString, 'image/svg+xml').getElementsByTagName('svg')[0];
        }
    },
    mounted() {
        // Game is not loaded yet.
        if (!this.gameIsLoaded)
            return;

        // Set colour scheme for this variant.
        this.colourSet = Colours.getColourSetForVariant(this.game.Variant);

        const t0 = performance.now();
        const svg = document.getElementById(this.game.ID);
        const supplyCentreNode = svg.getElementById('provinceLayer');
        const definitionGroups = this.mapDefinition.getElementsByTagName('g');

        /*
        * HTMLCollection is not iterable, but it is with a spread operator.
        * Append groups before those declared explicitly in Map.vue.
        */
        [...definitionGroups].forEach(g => {
            let clone = document.importNode(g, true);
            svg.insertBefore(clone, supplyCentreNode);
        });

        this.getProvinceData(svg);

        // Force update so SVG picks up on new province data.
        this.$forceUpdate();

        const t1 = performance.now();
        console.log('SVG rendered in ' + (t1 - t0) + ' ms');
    },
    methods: {
        getProvinceData(svg) {
            let supplyCentres = svg.getElementById('supply-centers'),
                otherProvinces = svg.getElementById('province-centers'),
                provincePathsNode = svg.getElementById('provinces'),
                that = this;

            // Get each supply centre's coordinates.
            if (this.phase) {
                [...supplyCentres.children].forEach(scSVG => {
                    const bbRect = scSVG.getBBox();
                    const scID = that.getSupplyCentreID(scSVG);
                    const sc = this.phase.SCs.find(sc => sc.Province === scID);

                    that.provinces[scID] = {
                        x: bbRect.x,
                        y: bbRect.y,
                        height: bbRect.height,
                        width: bbRect.width,
                        colour: sc ? that.colourSet[sc.Owner] : '#fff'
                    };
                });

                // Get the physical centre of all other provinces.
                [...otherProvinces.children].forEach(sc => {
                    const bbRect = sc.getBoundingClientRect();
                    const scID = that.getSupplyCentreID(sc);

                    that.provinces[scID] = {
                        x: bbRect.x + (bbRect.width / 2),
                        y: bbRect.y + (bbRect.height / 2),
                        height: bbRect.height,
                        width: bbRect.width
                    };
                });

                // Get each province's d (SVG path).
                [...provincePathsNode.children].forEach(p => (that.provinces[p.id].path = p.getAttribute('d')));
            }

            // Nuke the original groups.
            supplyCentres.remove();
            otherProvinces.remove();
            provincePathsNode.remove();
        },
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
