<template>
    <div>
        <svg :id="game.ID" height="100%" width="100%" :viewBox="viewBox">
            <defs>
                <marker id="move" viewBox="0 -5 10 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="moveviaconvoy" viewBox="0 -5 10 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="failedmove" viewBox="0 -5 10 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="failedmoveviaconvoy" viewBox="0 -5 10 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="support" viewBox="-6 -6 12 12" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0,0m -5,0a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"></path>
                </marker>
                <marker id="failedsupport" viewBox="-6 -6 12 12" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0,0m -5,0a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"></path>
                </marker>
                <marker id="convoy" viewBox="-1 -5 2 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z"></path>
                </marker>
                <marker id="failedconvoy" viewBox="-1 -5 2 10" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z"></path>
                </marker>
                <filter id="new" x="-2" y="-2" width="4" height="4">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
            </defs>

            <g id="provinceLayer">
                <map-province
                    v-for="(provinceData, key) in provinces"
                    :key="key"
                    :id="key"
                    :data="provinceData"
                />
            </g>

            <g id="supplyCentreLayer">
                <map-supply-centre
                    v-for="sc in SCs"
                    :key="sc.Name + 'Center'"
                    :id="sc.Name + 'Center'"
                    :data="provinces[sc.Name]"
                />

                <!-- <map-province
                    v-for="(provinceData, key) in provinces"
                    v-if="provinceData.sc"
                    :key="key + 'Center'"
                    :id="key + 'Center'"
                    :data="provinceData"
                /> -->
            </g>
        </svg>

        <!-- TODO: Display snackbar within map element only. -->
        <v-snackbar
            v-model="mapDidError"
            color="red">
            {{mapErrorMessage}}
        </v-snackbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    // import MapProcessor from '../utils/map';
    import Colours from '@/utils/colours';
    import MapOrder from './MapOrder';
    import MapProvince from './MapProvince';
    import MapSupplyCentre from './MapSupplyCentre';

    export default {
        name: 'diplomacy-map',
        components: {
            'map-order': MapOrder,
            'map-province': MapProvince,
            'map-supply-centre': MapSupplyCentre
        },
        props: ['readonly', 'promise'],
        data: () => ({
            provinces: { },
            mapDidError: false,
            mapErrorMessage: null
        }),
        // data() {
        //     return {
        //         dimensions: {
        //             height: 0,
        //             width: 0
        //         },
        //         svgBoundingClientRect: {},
        //         provinceCoordinates: {},
        //         provincePaths: {},
        //         // processor: null,
        //         clickedProvinces: [],
        //         colourSet: this.game ? Colors.getColorSetForVariant(this.game.Variant) : { },
        //         mapDidError: false,
        //         mapErrorMessage: null
        //     };
        // },
        async mounted() {
            // Let game data fetch triggered outside this component resolve first.
            await this.promise;

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
        computed: {
            ...mapGetters([
                'game',
                'phase',
                'gameVariant',
                'orders',
                'mapDefinition'
            ]),
            viewBox() {
                let width = 0,
                    height = 0;
                if (this.mapDefinition) {
                    width = this.mapDefinition.getAttribute('width');
                    height = this.mapDefinition.getAttribute('height');
                }

                return `0 0 ${width} ${height}`;
            },
            SCs() {
                return this.gameVariant.Graph ? Object.values(this.gameVariant.Graph.Nodes).filter(n => n.SC) : [];
            }
        },
        methods: {
            getProvinceData(svg) {
                let supplyCentres = svg.getElementById('supply-centers'),
                    otherProvinces = svg.getElementById('province-centers'),
                    provincePathsNode = svg.getElementById('provinces'),
                    that = this;

                // Get each supply centre's coordinates.
                [...supplyCentres.children].forEach(scSVG => {
                    const bbRect = scSVG.getBoundingClientRect();
                    const scID = that.getSupplyCentreID(scSVG);

                    that.provinces[scID] = {
                        x: bbRect.x,
                        y: bbRect.y,
                        height: bbRect.height,
                        width: bbRect.width
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

                // Nuke the original groups.
                supplyCentres.remove();
                otherProvinces.remove();
                provincePathsNode.remove();
            },
            getSupplyCentreID(sc) {
                return sc.id.substring(0, sc.id.length - 6);
            }
        }
        // methods: {

        //     getSCTransform(coordinates) {
        //         if (!coordinates)
        //             return '';
        //         const x = coordinates.x - coordinates.width;
        //         const y = coordinates.y - this.svgBoundingClientRect.y;
        //         return 'translate(' + x + ',' + y + ') scale(0.04)';
        //     },
        //     getUnitIcon(unit) {
        //         switch (unit.Unit.Type) {
        //         case 'Army': return '/static/army.svg#army';
        //         case 'Fleet': return '/static/fleet.svg#fleet';
        //         default: return '';
        //         }
        //     },
        //     getUnitTransform(coordinates) {
        //         if (!coordinates)
        //             return '';
        //         // Nudge the unit a little off the SC point.
        //         const x = coordinates.x - (coordinates.width * 1.8);
        //         const y = coordinates.y - this.svgBoundingClientRect.y;
        //         return 'translate(' + x + ',' + y + ') scale(0.05)';
        //     },
        //     getProvinceStyle(province) {
        //         if (!this.phase)
        //             return { display: 'none' };
        //         const sc = this.phase.SCs.find(sc => sc.Province === province);
        //         const baseColour = sc ? this.colourSet[sc.Owner] : '#fff';

        //         return {
        //             fill: baseColour,
        //             fillOpacity: 0.2,
        //             stroke: baseColour,
        //             strokeWidth: sc ? '5px' : '0px'
        //         };
        //     },
        //     getUnitStyle(unit) {
        //         return {
        //             fill: this.colourSet[unit.Unit.Nation]
        //         };
        //     },
        //     async handleProvinceClick(e) {
        //         let id = e.target.id,
        //             order;

        //         try {
        //             order = await this.processor.inputOrder(id);
        //             console.log(order);
        //         }
        //         catch (ex) {
        //             this.mapErrorMessage = ex.message;
        //             this.mapDidError = true;
        //             console.error(ex);
        //         }
                // vm.service.applyOrderLocally(order);

                // Apply/remote flash CSS.,
                // elToAnimate = angular.element(document.querySelector('#' + id + '-order'));
                // await $animate.addClass(el, 'submit success')
                //     .then(function() {
                //         el.removeClass('submit success');
                //     });
                // })
                // .catch(function(ex) {
                    // return $mdToast.show(
                    //     $mdToast.simple()
                    //     .textContent(id.toUpperCase() + ' order failed: ' + processOrderError(ex.data || ex.message))
                    //     .hideDelay(3000)
                    //     .parent(document.querySelector('#mapContainer'))
                    // );
            // }
        // }
    };
</script>

<style lang="scss">
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
