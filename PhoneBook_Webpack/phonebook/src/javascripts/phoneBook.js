import Vue from "vue";
import modal from "./modal.js";
// import modal from "./modal.vue";

import phoneBookComponent from "./phoneBookComponent.vue";

Vue.component('modal', modal);
new Vue({
    el: "#phone-book",
    components: {
        "phone-book-component": phoneBookComponent
    },
    template: "<phone-book-component></phone-book-component>"
});

// new Vue({
//     el: "#modal-template",
//     components: {
//         "modal": modal
//     },
//     template: "<modal></modal>"
// });