<template>
    <div>
        <v-toolbar fixed clipped-right app class="primary">
            <v-menu v-model="showMenu" absolute>
                <v-layout slot="activator" class="white--text" column v-ripple>
                    <v-flex>{{userLabel}}</v-flex>
                    <v-flex v-if="userStats.PracticalRating > 0">{{userStats.PracticalRating}} points</v-flex>
                </v-layout>
                <v-list>
                    <v-list-tile v-for="(item, i) in menuItems"
                                 :key="i"
                                 :to="item.path"
                                 @click="">
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile>
                    <v-divider />
                    <v-list-tile key="logOff" @click="logOut">
                        <v-list-tile-title>Log off</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer />
            <v-toolbar-title class="white--text">
                <span>dipl.io</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-content v-if="variantsAreFetched">
            <v-container fill-height fluid>
                <v-layout row>
                    <v-flex>
                        <router-view />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import vuex from 'vuex';

import Auth from '@/utils/auth';
import User from '@/api/user';

export default {
    name: 'AuthBase',
    data: () => ({
        showMenu: false,
        variantsAreFetched: false,
        menuItems: [
            { text: 'New game', path: '/games/new' },
            { text: 'My games', path: '/profile/games' }
        ]
    }),
    computed: {
        ...vuex.mapGetters([
            'user',
            'userStats'
        ]),
        userLabel() {
            return this.user.Email || this.user.Name;
        }
    },
    async created() {
        // Get/cache all variant data. Requires no auth.
        await this.setVariants();

        // Get the current user ID. Sadly redundant to next call, but required.
        const user = await User.getUser();

        // Get/cache user and user stats.
        this.setUser(await User.getUserAndStats(user.User.Id));


        // Flag the view to render content that may need variant data.
        this.$nextTick(() => { this.variantsAreFetched = true; });
    },
    methods: {
        ...vuex.mapActions([
            'toggleDrawer',
            'setVariants',
            'setVariantMap',
            'setUser'
        ]),
        logOut: Auth.logOut
    }
};
</script>

<style lang="scss">
</style>
