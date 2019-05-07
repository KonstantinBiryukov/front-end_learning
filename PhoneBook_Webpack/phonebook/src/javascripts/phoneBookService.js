import {post} from "./post.js";
import $ from "jquery";

export function deleteContact(data) {
    return post("/deleteContact", data);
}

export function deleteAll(data) {
    return post("/deleteAll", data);
}

export function addContact(request) {
    return post("/addContact", request);
}

export function getContacts(search) {
    return $.get("/getContacts", search);
}