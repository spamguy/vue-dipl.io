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
        <v-tabs-content
            v-for="tab in tabs"
            :key="tab"
            :id="tab"
        >
            <v-card flat>
                <v-card-text>{{tab}}</v-card-text>
            </v-card>
        </v-tabs-content>
    </v-tabs>
</div>
</template>

<script>
export default {
    name: 'profile',
    data() {
        return {
            tabs: ['Active', 'Waiting', 'Finished']
        };
    }
};
</script>

<style lang="scss">
</style>
