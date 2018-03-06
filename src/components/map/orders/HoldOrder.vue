<template>
    <circle
        :cx="x"
        :cy="y"
        :id="province + 'Hold'"
        r="14"
        class="hold"
    />
</template>

<script>
export default {
    name: 'HoldOrder',
    props: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
    circle.hold
    {
        fill: none;
        stroke-width: 3px;
        stroke: #000;

        &.failed
        {
            stroke: #f00;
            stroke-dasharray: 10, 5;
        }
    }
</style>
