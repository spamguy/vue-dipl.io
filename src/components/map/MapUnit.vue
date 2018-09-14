<template>
    <use :xlink:href="unitIcon"
         :id="unit.Province + 'Unit'"
         :style="unitStyle"
         :transform="unitTransform"
    />
</template>

<script>
import { mapGetters } from 'vuex';

// Units need to be nudged a little to the upper left to look accurate.
const PX_NUDGE = 40;

export default {
    name: 'MapUnit',
    props: {
        unit: {
            type: Object,
            required: true
        },
        coords: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(['colourSet']),
        unitIcon() {
            switch (this.unit.Unit.Type) {
            case 'Army': return '/army.svg#army';
            case 'Fleet': return '/fleet.svg#fleet';
            default: return '';
            }
        },
        colour() { return this.colourSet[this.unit.Unit.Nation]; },
        unitStyle() {
            return { fill: this.colour };
        },
        unitTransform() {
            // These coordinates are already nudged SW of the SC marker. Counter-nudge them a little closer.
            const x = this.coords.x - PX_NUDGE;
            const y = this.coords.y - PX_NUDGE;
            return `translate(${x},${y}) scale(0.05)`;
        }
    }
};
</script>
