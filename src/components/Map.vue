<template>
    <svg :id="game.ID" height="100%" width="100%" :viewBox="getViewBox()">
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
        <g id="supplyCentreLayer">
            <!-- COMBAK: I want to use Map, but Vue doesn't support that yet. :( See ticket 2410. -->
            <path
                v-for="(coords, sc) in provinceCoordinates"
                :id="sc"
                :key="sc"
                :transform="getSCTransform(coords)"
                v-if="coords.isSC"
                d="m 15.64,213.212 117.92,105.865 -33.174,154.959 c -1.035,4.834 0.876,9.824 4.876,12.729 3.999,2.906 9.335,3.181 13.613,0.704 l 137.124,-79.434 137.124,79.434 c 1.944,1.126 4.107,1.684 6.265,1.684 2.588,0 5.167,-0.802 7.348,-2.387 4,-2.906 5.911,-7.896 4.876,-12.729 L 378.44,319.077 496.359,213.212 c 3.679,-3.302 5.065,-8.462 3.538,-13.164 -1.528,-4.702 -5.683,-8.061 -10.6,-8.571 L 331.671,175.143 267.425,30.279 c -2.004,-4.519 -6.483,-7.432 -11.427,-7.432 -4.944,0 -9.423,2.914 -11.427,7.433 L 180.329,175.143 22.702,191.477 c -4.917,0.51 -9.072,3.869 -10.6,8.571 -1.528,4.702 -0.141,9.862 3.538,13.164 z"
            />
        </g>
        <g id="unitLayer">
            <use v-for="unit in phase.Units"
                :xlink:href="getUnitIcon(unit)"
                :key="unit.Province + 'Unit'"
                :id="unit.Province + 'Unit'"
                :transform="getUnitTransform(provinceCoordinates[unit.Province + 'Center'])"
            />
        </g>
    </svg>
</template>

<script>
    import MapProcessor from '../utils/map';

    export default {
        name: 'diplomacy-map',
        props: ['game', 'phase'],
        data() {
            return {
                dimensions: {
                    height: 0,
                    width: 0
                },
                svgBoundingClientRect: { },
                provinceCoordinates: { },
                processor: null
            };
        },
        mounted() {
            let processor = new MapProcessor(this.$localStorage.get('map.' + this.game.Variant), this.game);

            this.dimensions = processor.getDimensions();
            this.svgBoundingClientRect = processor.getYShift();
            processor.copyGroups();
            this.provinceCoordinates = processor.getProvinceCoordinates();
        },
        methods: {
            getViewBox() {
                return '0 0 ' + this.dimensions.width + ' ' + this.dimensions.height;
            },
            getSCTransform(coordinates) {
                if (!coordinates)
                    return '';
                const x = coordinates.x - coordinates.width;
                const y = coordinates.y - this.svgBoundingClientRect.y;
                return 'translate(' + x + ',' + y + ') scale(0.04)';
            },
            getUnitIcon(unit) {
                switch (unit.Unit.Type) {
                case 'Army': return '/static/army.svg#army';
                case 'Fleet': return '/static/fleet.svg#fleet';
                default: return '';
                }
            },
            getUnitTransform(coordinates) {
                if (!coordinates)
                    return '';
                const x = coordinates.x - coordinates.width;
                const y = coordinates.y - this.svgBoundingClientRect.y;
                return 'translate(' + x + ',' + y + ') scale(0.06)';
            }
        }
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
            fill: green;
        }
    }
</style>
