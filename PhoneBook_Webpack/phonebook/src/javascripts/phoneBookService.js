import post from "./post.js";
import $ from "jquery";

export default {
    deleteContact(data) {
        return post("/deleteContact", data);
    },
    deleteAll(data) {
        return post("/deleteAll", data);
    },
    addContact(request) {
        return post("/addContact", request);
    },
    getContacts(search) {
        return $.get("/getContacts", search);
    }
}