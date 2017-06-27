<template>
    <div id="app">
        <v-btn dark default class="btn--dark-flat-focused" @click.native="doStuff">Log In</v-btn>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
        doStuff: () => { console.log('I did something!'); }
    }
};
</script>

<style lang="scss">
    @import '../../node_modules/vuetify/dist/vuetify.min.css';
</style>
