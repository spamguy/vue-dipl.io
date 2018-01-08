<template>
    <path :d="data.path"
          class="province"
          :style="provinceStyle"
    />
</template>

<script>
export default {
    name: 'MapProvince',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        provinceStyle() {
            if (!this.data.colour)
                return { fill: '#fff' };
            return {
                fill: this.data.colour,
                stroke: this.data.colour,
                strokeWidth: this.data.colour !== '#fff' ? '5px' : '0px'
            };
        }
    }
};
</script>

<style lang="scss">
    .province
    {
        fill-opacity: 0.2;
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
