"use strict";

new Vue({
    el: "#todo-list-app",
    data: {
        todoText: "",
        items: [],
        links: {
            delLink: "../resources/deleteImage.png",
            editLink: "../resources/editImage.png",
            cancelLink: "../resources/cancelImage.png",
            saveLink: "../resources/saveImage.png"
        },
        editableMode: false,
        currentText: ""
    },
    methods: {
        addItem: function () {
            $(".badge-danger").remove();
            if (this.todoText.trim().length !== 0) {
                this.items.push(this.todoText);
                this.todoText = "";
            } else {
                var child = ("<span class='badge badge-danger'>input field is empty</span>");
                $(".list-title").append(child);
            }
        },
        deleteItem: function (i) {
            this.items.splice(i, 1);
        },
        editItem: function (i) {
            this.currentText = this.items[i];
            this.editableMode = true;
        },
        cancelItem: function (i) {
            this.items[i] = this.currentText;
            this.editableMode = false;
        },
        saveItem: function () {
            this.editableMode = false;
        }
    }
});