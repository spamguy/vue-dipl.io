<script>
export default {
    name: 'Login',
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (to.query.token)
                vm.$localStorage.set('token', to.query.token);
            next('profile/games');
        });
    }
};
</script>
