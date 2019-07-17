import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

import PhoneBook from './vue/PhoneBook';
import Page404 from './views/Page404.vue';

import Vuetify from "vuetify";

Vue.use(Vuetify);
Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/phoneBook',
            name: 'phoneBook',
            component: PhoneBook
        },
        {
            path: '/*',
            name: "404",
            component: Page404
        }
    ]
});