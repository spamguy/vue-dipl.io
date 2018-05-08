<template>
    <use :xlink:href="unitIcon"
         :id="unit.Province + 'Unit'"
         :style="unitStyle"
         :transform="unitTransform"
    />
</template>

<script>
export default {
    name: 'MapUnit',
    props: {
        unit: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        unitIcon() {
            switch (this.unit.Unit.Type) {
            case 'Army': return '/army.svg#army';
            case 'Fleet': return '/fleet.svg#fleet';
            default: return '';
            }
        },
        unitStyle() {
            return this.data ? { fill: this.data.colour } : { display: 'none' };
        },
        unitTransform() {
            if (!this.data)
                return '';

            // These coordinates are already nudged SW of the SC marker. Counter-nudge them a little closer.
            const x = this.data.x - 5;
            const y = this.data.y - 5;
            return `translate(${x},${y}) scale(0.05)`;
        }
    }
};
</script>
