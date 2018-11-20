<template>
    <v-btn dark default class="btn--dark-flat-focused" @click.native="onClick">Log In</v-btn>
</template>

<script>
import { logIn } from '@/utils/Auth';

export default {
    name: 'Home',
    methods: {
        async onClick() {
            const fakeID = this.$route.query['fake-id'];

            await logIn(fakeID);
            this.$router.push('profile/games');
        }
    }
};
</script>

<style lang="scss">
</style>
