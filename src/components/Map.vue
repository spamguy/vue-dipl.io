<template>
    <svg :id="game.ID" :height="dimensions.height" :width="dimensions.width">
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
                    let processor = new MapProcessor(this.$localStorage.get('map.' + this.game.Variant));

                    this.dimensions = processor.getDimensions();
                }
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
