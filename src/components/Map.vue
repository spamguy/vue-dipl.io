<template>
    <svg :id="game.ID" height="100%" width="100%" :viewBox="getViewBox()">
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
                }
            };
        },
        watch: {
            phase(newPhase) {
                if (newPhase) {
                    let processor = new MapProcessor(this.$localStorage.get('map.' + this.game.Variant), newPhase.Properties);

                    this.dimensions = processor.getDimensions();
                    processor.copyGroups();
                }
            }
        },
        methods: {
            getViewBox() {
                return '0 0 ' + this.dimensions.width + ' ' + this.dimensions.height;
            }
        }
    };
</script>

<style lang="scss">
    svg g[inkscape\:label="supply centers"] path
    {
        stroke: #fff500 !important;
    }
</style>
