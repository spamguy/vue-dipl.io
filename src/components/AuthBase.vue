<template>
    <div>
        <!-- <v-navigation-drawer
            persistent
            absolute
            clipped
            app
            :value="isDrawerOpen"
        >
            <v-list dense>
                <v-list-tile v-for="item in menuItems" :key="item.text">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <router-link :to="item.path">{{item.text}}</router-link>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click.native.stop="logOut()">
                    <v-list-tile-content>
                        <v-list-tile-title>Log out</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer> -->

        <v-toolbar fixed clipped-right app class="primary">
            <v-toolbar-title class="white--text">
                <!-- <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon> -->
                <span>dipl.io</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-content v-if="variantsAreFetched">
            <v-container fill-height fluid>
                <v-layout row>
                    <v-flex>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import vuex from 'vuex';
import Auth from '@/utils/auth';

export default {
    name: 'authbase',
    data: () => ({
        variantsAreFetched: false,
        menuItems: [
            { text: 'New game', path: '/games/new' },
            { text: 'My games', path: '/profile/games' }
        ]
    }),
    methods: {
        ...vuex.mapActions([
            'toggleDrawer',
            'setVariants',
            'setVariantMap'
        ]),
        logOut: Auth.logOut
    },
    // computed: {
    //     ...vuex.mapState({
    //         isDrawerOpen: state => state.user.isDrawerOpen
    //     })
    // },
    async created() {
        await this.setVariants();

        // Flag the view to render content that may need variant data.
        this.$nextTick(() => { this.variantsAreFetched = true; });
    }
};
</script>

<style lang="scss">
</style>
