<template>
    <div :id="game.ID"></div>
</template>

<script>
    import Snap from 'snapsvg-cjs';
    import MapUtil from '../utils/map';

    export default {
        name: 'diplomacy-map',
        props: ['game', 'phase'],
        watch: {
            phase(newPhase) {
                let processedSVG;
                if (newPhase) {
                    const t0 = performance.now();

                    // Turn variant definition string into Snap object.
                    const baseSVG = Snap.parse(this.$localStorage.get('map.' + this.game.Variant));

                    // Turn Snap object into DOM.
                    processedSVG = MapUtil.processSVGFragment(baseSVG, this.game, newPhase.Properties);

                    // Append DOM.
                    Snap('#' + this.game.ID).append(processedSVG);
                    const t1 = performance.now();
                    console.log('SVG for game ' + this.game.ID + ' rendered in ' + (t1 - t0));
                }
            }
        }
    };
</script>
