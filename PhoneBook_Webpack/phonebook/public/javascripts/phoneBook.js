import {modalTemplate} from "./modal.js";
import Vue from "vue";

import phoneBookComponent from "./phoneBookComponent.vue";

Vue.component('modal', modalTemplate);
new Vue({
    el: "#phone-book",
    components: {
        "phone-book-component": phoneBookComponent
    },
    template: "<phone-book-component></phone-book-component>"

});