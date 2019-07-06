import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        usedSearchTerm: ""
    },
    computed: {
        getContacts(state) {
            return state.contacts;
        }
    },
    mutations: {
        changeSearch(state, search) {
            state.usedSearchTerm = search;
        }
    },
    actions: {}
});