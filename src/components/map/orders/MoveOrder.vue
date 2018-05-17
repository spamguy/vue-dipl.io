<template>
    <path :id="province + '-order'"
          class="move"
          :d="arcPath"
          :marker-end="markerEnd" />
</template>

<script>
export default {
    name: 'MoveOrder',
    props: {
        province: {
            type: String,
            required: true
        },
        originX: {
            type: Number,
            required: true
        },
        originY: {
            type: Number,
            required: true
        },
        targetX: {
            type: Number,
            required: true
        },
        targetY: {
            type: Number,
            required: true
        },
        failed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        /**
            * Generate an SVG path line with a slight arc to it.
            * @return {String}    An SVG path.
            */
        arcPath() {
            const LINK_UNIT_PADDING = 1,
                dx = this.targetX - this.originX,
                dy = this.targetY - this.originY,
                dr = Math.sqrt(dx * dx + dy * dy),
                offsetX = (dx * LINK_UNIT_PADDING) / dr,
                offsetY = (dy * LINK_UNIT_PADDING) / dr;

            return `M${this.originX},${this.originY}A${dr},${dr} 0 0,1 ${this.targetX - offsetX},${this.targetY - offsetY}`;
        },

        markerEnd() {
            // See CSS file for why separate markers exist for failed orders.
            const fullPath = this.$route.fullPath,
                    failedClass = (this.failed && 'failed') || '';
            return `url(${fullPath}#${failedClass}move)`;
        }
    }
};
</script>

<style lang="scss">
    // TODO: Refactor alongside HoldOrder into reusable component.
    path.move
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
