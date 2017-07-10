<template>
    <v-btn dark default class="btn--dark-flat-focused" @click.native="logIn">Log In</v-btn>
</template>

<script>
export default {
    name: 'home',
    methods: {
        logIn() {
            var fakeID = this.$route.query['fake-id'];
            this.$store.dispatch('setUserToken', fakeID)
            .then(() => {
                this.$router.push('profile');
            });
        }
    }
};
</script>

<style lang="scss">
</style>
