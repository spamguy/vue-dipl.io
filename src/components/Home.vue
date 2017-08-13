<template>
    <v-btn dark default class="btn--dark-flat-focused" @click.native="logIn">Log In</v-btn>
</template>

<script>
import Auth from '@/utils/auth';

export default {
    name: 'home',
    methods: {
        async logIn() {
            const fakeID = this.$route.query['fake-id'];
            await Auth.logIn(fakeID);
        }
    }
};
</script>

<style lang="scss">
</style>
