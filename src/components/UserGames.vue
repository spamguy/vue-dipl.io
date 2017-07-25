<template>
    <div class="ma-3 elevation-1">
    <v-tabs dark>
        <v-tabs-bar slot="activators">
            <v-tabs-item
                v-for="tab in tabs"
                :key="tab"
                :href="'#' + tab"
                ripple
            >
                {{tab}}
            </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id="Active">
            <v-card flat>
                <v-card-text v-for="game in activeGames" :key="game.Id">{{game.Name}}</v-card-text>
            </v-card>
        </v-tabs-content>
        <v-tabs-content id="Waiting">
            <v-card flat>
                <v-card-text v-for="game in waitingGames" :key="game.Id">{{game.Name}}</v-card-text>
            </v-card>
        </v-tabs-content>
        <v-tabs-content id="Finished">
            <v-card flat>
                <v-card-text v-for="game in finishedGames" :key="game.Id">{{game.Name}}</v-card-text>
            </v-card>
        </v-tabs-content>
    </v-tabs>
</div>
</template>

<script>
export default {
    name: 'usergames',
    data() {
        return {
            tabs: ['Active', 'Waiting', 'Finished']
        };
    },
    computed: {
        activeGames() {
            return this.$store.state.user.games.active;
        },
        waitingGames() {
            return this.$store.state.user.games.waiting;
        },
        finishedGames() {
            return this.$store.state.user.games.finished;
        }
    },
    created() {
        this.$store.dispatch('fetchFinishedGames');
        this.$store.dispatch('fetchStagingGames');
        this.$store.dispatch('fetchActiveGames');
    }
};
</script>

<style lang="scss">
</style>
