"use strict";
/**
 components hierarchy: 1)to_do-list (parent) --> 2)to_do-item (child);

 Компонент t0do-item принимает от своего родителя item через параметр (props) и при необходимости
 возвращает родителю неизмененный объект item через emit, отслеживая нажатия кнопок.
 Компонент t0do-item генерирует событие на себе (edit),
 либо передает событие родителю (emit --> remove/cancel/save) для дальнейшей обработки родителем.
 Этот компонент содержит в себе элемент списка (li), содержит UI элементы li и логику по переключению
 editable mode.
 */

Vue.component("todo-item", {
    props: ["item"],
    data: function () {
        return {
            editableMode: false,
            previousText: this.item.text
        };
    },
    template: "#todo-item-template",
    methods: {
        remove: function () {
            this.$emit("remove-item", this.item);
        },
        edit: function () {
            this.editableMode = true;
        },
        save: function () {
            if (this.item.text.trim().length > 0) {
                this.previousText = this.item.text;
            } else {
                this.$emit("cancel-changes", this.item, this.previousText);
            }
            this.editableMode = false;
        },
        cancel: function () {
            this.$emit("cancel-item", this.item, this.previousText);
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
            isInputEmpty: false,
            warningMessage: "input field is empty"
        };
    },
    template: "#todo-list-template",
    methods: {
        addItem: function () {
            if (this.currentToDoText.trim().length > 0) {
                this.isInputEmpty = false;
                id++;
                this.items.push({id: id, text: this.currentToDoText});
                this.currentToDoText = "";
            } else {
                this.warningMessage = "input field is empty";
                this.isInputEmpty = true;
            }
        },
        removeItem: function (item) {
            this.items = this.items.filter(function (e) {
                return e.id !== item.id;
            });
        },
        cancelItem: function (item, previousText) {
            item.text = previousText;
        },
        cancelChanges: function (item, previousText) {
            item.text = previousText;
            this.warningMessage = "Empty item is not allowed. Previous value is returned.";
            this.isInputEmpty = true;
        }
    }
});

new Vue({
    el: "#to-do-list-app"
});