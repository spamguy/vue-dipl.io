<template>
    <div>
        <v-navigation-drawer
            class="pb-0"
            :right="true"
            persistent
            absolute
        >
            <v-list dense>
                <template v-for="item in menuItems">
                    <v-layout row>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{item.text}}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-layout>
                </template>
            </v-list>
        </v-navigation-drawer>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'authbase',
    data: () => ({
        menuItems: [
            { text: 'More hello' }
        ]
    })
};
</script>

<style lang="scss">
</style>
