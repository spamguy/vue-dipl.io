<template>
    <div id="app">
        <v-btn dark default class="btn--dark-flat-focused" @click.native="logIn">Log In</v-btn>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
        logIn() {
            var fakeID = this.$route.query['fake-id'];
            this.$store.dispatch('setUserToken', fakeID);
        }
    }
};
</script>

<style lang="scss">
    @import '../../node_modules/vuetify/dist/vuetify.min.css';
</style>
