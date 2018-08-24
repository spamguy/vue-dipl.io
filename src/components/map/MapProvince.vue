<template>
    <path :id="mapDefinition.name"
          :d="mapDefinition.d"
          :style="provinceStyle"
          class="province"
    />
</template>

<script>
import VariantMapProvince from '@/models/VariantMapProvince';
import Colours from '@/utils/Colours';

export default {
    name: 'MapProvince',
    props: {
        mapDefinition: {
            type: VariantMapProvince,
            required: true
        },
        phaseContext: {
            type: Object
        }
    },
    computed: {
        provinceStyle() {
            if (!this.phaseContext)
                return { };

            const ownerColour = Colours.getColourSetForVariant(this.mapDefinition.Name)[this.phaseContext.Owner];
            return {
                fill: ownerColour,
                stroke: ownerColour,
                strokeWidth: ownerColour !== '#fff' ? '5px' : '0px'
            };
        }
    }
};
</script>

<style lang="scss">
    .province
    {
        fill-opacity: 0.2;
        fill: #fff;
        stroke: black;
        stroke-width: 1px;

        &:hover
        {
            fill: #eee;
            cursor: pointer;
        }

        &.clicked
        {
            transition-property: fill, fill-opacity;
            transition-duration: 0.2s;
            transition-timing-function: linear;
            fill: #ffece4
        }
    }
</style>
