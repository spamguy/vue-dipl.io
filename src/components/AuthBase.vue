<template>
    <div>
        <v-toolbar fixed clipped-right app class="primary">
            <v-menu v-model="showMenu" absolute>
                <v-layout slot="activator" class="white--text" column v-ripple>
                    <v-flex>{{user.Email || user.Name}}</v-flex>
                    <v-flex v-if="user.Name">
                        {{userStats.Glicko.PracticalRating}} points
                    </v-flex>
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

import { logOut } from '@/utils/Auth';
import User from '@/api/user';

export default {
    name: 'AuthBase',
    data: () => ({
        showMenu: false,
        variantsAreFetched: false,
        menuItems: [
            { text: 'New game', path: '/games/new' },
            { text: 'Join a game', path: '/games/open' },
            { text: 'My games', path: '/profile/games' },
            { text: 'Game archive', path: '/games' }
        ]
    }),
    computed: {
        ...vuex.mapGetters([
            'user',
            'userStats'
        ])
    },
    async created() {
        // Get/cache all variant data. Requires no auth.
        await this.setVariants();

        // Get the current user and stats.
        const user = await User.getUser();
        const stats = await User.getUserStats(user.User.Id);

        // Get/cache user and user stats.
        this.setUser(user);
        this.setUserStats(stats);


        // Flag the view to render content that may need variant data.
        this.$nextTick(() => { this.variantsAreFetched = true; });
    },
    methods: {
        ...vuex.mapActions([
            'toggleDrawer',
            'setVariants',
            'setUser',
            'setUserStats'
        ]),
        logOut
    }
};
</script>

<style lang="scss">
</style>
