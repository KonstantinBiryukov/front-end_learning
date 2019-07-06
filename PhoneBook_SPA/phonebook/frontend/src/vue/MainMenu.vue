<template>
    <div>
        <v-navigation-drawer app temporary v-model="drawer" fixed>
            <v-list dense>
                <v-list-tile v-for="(item, i) in menuItems" :key="'menuitem${i}'" :to="item.route">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="indigo" dark fixed>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Phone Book</v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: true
            };
        },
        props: {
            source: String
        },
        computed: {
            menuItems() {
                return [{
                    title: "Home",
                    icon: "home",
                    route: "/home"
                }, {
                    title: "Phone Book",
                    icon: "library_books",
                    route: "/phonebook"

                }, {
                    title: "About",
                    icon: "info",
                    route: "/about"
                }]
            }
        }
    }
</script>