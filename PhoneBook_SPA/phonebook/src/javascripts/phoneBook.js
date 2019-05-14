import Vue from "vue";
import phoneBook from "../vue/PhoneBook.vue";

new Vue({
    el: "#phone-book",
    components: {
        phoneBook
    },
    template: "<phone-book></phone-book>"
});

