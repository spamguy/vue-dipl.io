<template>
    <v-btn dark default class="btn--dark-flat-focused" @click.native="logIn">Log In</v-btn>
</template>

<script>
import User from '../api/user';

export default {
    name: 'home',
    methods: {
        async logIn() {
            const fakeID = this.$route.query['fake-id'];

            if (fakeID) {
                this.$localStorage.set('fakeID', fakeID);
            }
            else {
                const token = await User.getUserToken();
                this.$localStorage.set('token', token);
            }

            this.$router.push('profile/games');
        }
    }
};
</script>

<style lang="scss">
</style>
