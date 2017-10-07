<template>
    <div>
        <v-navigation-drawer
            :right="true"
            persistent
            clipped
            enable-resize-watcher
            app
            v-model="isDrawerOpen"
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
        </v-navigation-drawer>

        <v-toolbar fixed clipped-right app class="primary">
            <v-toolbar-title class="white--text">dipl.io</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="isDrawerOpen = !isDrawerOpen"></v-toolbar-side-icon>
        </v-toolbar>

        <router-view></router-view>
    </div>
</template>

<script>
import Auth from '@/utils/auth';
export default {
    name: 'authbase',
    data: () => ({
        isDrawerOpen: false,
        menuItems: [
            { text: 'My games', path: '/profile/games' }
        ]
    }),
    methods: {
        logOut() { Auth.logOut(); }
    }
};
</script>

<style lang="scss">
</style>
