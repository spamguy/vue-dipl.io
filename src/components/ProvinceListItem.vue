<template>
    <v-list-tile>
        <v-list-tile-content>
            <span class="province">{{unit.Province}}</span></v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
        name: 'provincelistitem',
        props: ['unit']
    };
</script>

<style lang="scss">
    span.province
    {
        text-transform: uppercase;
    }
</style>
