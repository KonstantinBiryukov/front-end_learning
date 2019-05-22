import post from "./post.js";
import $ from "jquery";

export default {
    deleteContact(contactId) {
        return post("/deleteContact", {id: contactId});
    },
    deleteAll(checkedContactsIds) {
        return post("/deleteAll", {id: checkedContactsIds});
    },
    addContact(contact) {
        return post("/addContact", contact);
    },
    getContacts(search) {
        return $.get({
            url: "/getContacts",
            dataType: "json",
            data: {search: search}
        });
    }
}