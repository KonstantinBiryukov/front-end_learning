<template>
    <v-app id="phone-book">
        <main-menu></main-menu>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex shrink>
                        <router-view/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <phone-book-footer></phone-book-footer>
    </v-app>
</template>

<script>
    import MainMenu from './vue/MainMenu.vue';
    import PhoneBookFooter from './vue/PhoneBookFooter.vue';

    export default {
        components: {
            MainMenu,
            PhoneBookFooter
        }
    }
</script>