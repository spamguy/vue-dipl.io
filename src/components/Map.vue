<template>
    <div>
        {{renderMapSVG()}}
    </div>
</template>

<script>
    import Phase from '../api/phase';
    export default {
        name: 'diplomacy-map',
        props: ['game', 'phase', 'variant'],
        methods: {
            async renderMapSVG() {
                return Phase.getMapForPhase(this.phase);
            }
        }
    };
</script>
