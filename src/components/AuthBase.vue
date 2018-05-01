<template>
    <div>
        <v-toolbar fixed clipped-right app class="primary">
            <v-toolbar-title class="white--text">
                <span>dipl.io</span>
            </v-toolbar-title>
            <v-spacer />
            <v-menu>
                <v-btn slot="activator"
                       color="red"
                       dark
                       small
                       depressed
                       fab>
                    <span class="white--text">{{user.Name[0]}}</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="(item, i) in menuItems"
                                 :key="i"
                                 :to="item.path"
                                 @click="">
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
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
import Game from '@/api/game';

export default {
    name: 'AuthBase',
    data: () => ({
        variantsAreFetched: false,
        menuItems: [
            { text: 'New game', path: '/games/new' },
            { text: 'My games', path: '/profile/games' }
        ]
    }),
    computed: {
        ...vuex.mapGetters([
            'user'
        ])
    },
    async created() {
        await this.setVariants();
        this.setUser(await Game.getUserData());

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
