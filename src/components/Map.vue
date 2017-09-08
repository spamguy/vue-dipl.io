<template>
    <div :id="game.ID"></div>
</template>

<script>
    import Snap from 'snapsvg-cjs';
    import MapUtil from '../utils/map';

    export default {
        name: 'diplomacy-map',
        props: ['game', 'phase'],
        data() {
            return {
                svg: Snap.parse(this.$localStorage.get('map.' + this.game.Variant))
            };
        },
        watch: {
            phase(newPhase) {
                let processedSVG;
                if (newPhase) {
                    processedSVG = MapUtil.processSVGFragment(this.svg, this.game, newPhase);
                    Snap('#' + this.game.ID).append(processedSVG);
                }
            }
        }
    };
</script>
