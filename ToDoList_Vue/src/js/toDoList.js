"use strict";
/**
 components hierarchy: 1)to_do-list (parent) --> 2)to_do-item (child);

 Компонент t0do-item принимает от своего родителя item через параметр (props) и при необходимости
 возвращает родителю неизмененный объект item через emit, отслеживая нажатия кнопок.
 Компонент t0do-item генерирует событие на себе (cancel/edit/save),
 либо передает событие родителю (emit --> remove) для дальнейшей обработки родителем.
 Этот компонент содержит в себе элемент списка (li), содержит UI элементы li и логику по переключению
 editable mode.
 */

Vue.component("todo-item", {
    props: ["item"],
    data: function () {
        return {
            editableMode: false,
            previousText: this.item.text
        }
    },
    template:
        "<li>\
            <span v-if='!editableMode'>{{ item.text }}\
                 <button type='button' @click='remove' style='background-image:url(\"../resources/deleteImage.png\")'\
                 class='image-button'></button>\
                <button type='button' @click='edit' style='background-image:url(\"../resources/editImage.png\")'\
                 class='image-button'></button>\
            </span>\
            <span v-else>\
                <input type='text' v-model='item.text'> \
                <button type='button' @click='save' style='background-image:url(\"../resources/saveImage.png\")' \
                class='image-button'></button>\
                <button type='button' @click='cancel' style='background-image:url(\"../resources/cancelImage.png\")'\
                class='image-button'></button>\
            </span>\
        </li>",
    methods: {
        remove: function () {
            this.$emit("remove-item", this.item);
        },
        edit: function () {
            this.editableMode = true;
        },
        save: function () {
            this.previousText = this.item.text;
            this.editableMode = false;
        },
        cancel: function () {
            this.item.text = this.previousText;
            this.editableMode = false;
        }
    }
});

var id = 0;
Vue.component("todo-list", {
    data: function () {
        return {
            currentToDoText: "",
            items: [], // массив объектов {id: "", text: ""}
            isInputEmpty: false
        };
    },
    template:
        "<div><span v-if='isInputEmpty' class='badge badge-danger fixed-top'>input field is empty</span>\
             <div class='row col-6 input-group m-3'>\
                 <input type='text' id='add-form' class='form-control' placeholder='create an item' v-model='currentToDoText'>\
                 <div class='input-group-append'>\
                        <button class='btn btn-outline-primary' type='button' @click='addItem'>Add</button>\
                 </div>\
            </div>\
            <ul v-if='items.length'> List of notes: \
                <todo-item v-for='item in items' \
                    @remove-item='removeItem'\
                    v-bind:item='item'\
                    v-bind:key='item.id'>\
                </todo-item>\
            </ul>\
        </div>",
    methods: {
        addItem: function () {
            if (this.currentToDoText.trim().length > 0) {
                this.isInputEmpty = false;
                this.items.push({id: id++, text: this.currentToDoText});
                this.currentToDoText = "";
            } else {
                this.isInputEmpty = true;
            }
        },
        removeItem: function (item) {
            this.items = this.items.filter(function (e) {
                return e.id !== item.id;
            });
        }
    }
});

new Vue({
    el: "#app"
});

// new Vue({
//     el: "#todo-list-app",
//     data: {
//         todoText: "",
//         items: [],
//         links: {
//             delLink: "../resources/deleteImage.png",
//             editLink: "../resources/editImage.png",
//             cancelLink: "../resources/cancelImage.png",
//             saveLink: "../resources/saveImage.png"
//         },
//         editableMode: false,
//         currentText: ""
//     },
//     methods: {
//         addItem: function () {
//             $(".badge-danger").remove();
//             if (this.todoText.trim().length !== 0) {
//                 this.items.push(this.todoText);
//                 this.todoText = "";
//             } else {
//                 var child = ("<span class='badge badge-danger'>input field is empty</span>");
//                 $(".list-title").append(child);
//             }
//         },
//         deleteItem: function (i) {
//             this.items.splice(i, 1);
//         },
//         editItem: function (i) {
//             this.currentText = this.items[i];
//             this.editableMode = true;
//         },
//         cancelItem: function (i) {
//             this.items[i] = this.currentText;
//             this.editableMode = false;
//         },
//         saveItem: function () {
//             this.editableMode = false;
//         }
//     }
// });