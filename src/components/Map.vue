<template>
    <div v-html="svg"></div>
</template>

<script>
    export default {
        name: 'diplomacy-map',
        props: ['game', 'phase'],
        data() {
            return {
                svg: this.$localStorage.get('map.' + this.game.Variant)
            };
        }
    };
</script>
