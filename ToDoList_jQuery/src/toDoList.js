// • Сделайте версию TodoList с jQuery
// • По максимуму сделайте все через jQuery

"use strict";

// DOMContentLoaded
$(function () {
    initPage();
});

var unorderedList;

function initPage() {
    unorderedList = $("#notes");

    $("#add-button").click(function () {
        var inputField = $("#add-element-field");

        if (inputField.val() === "") {
            return;
        }

        var listItem = $("<li></li>");
        listItem.text(inputField.val());
        listItem.appendTo(unorderedList);
        inputField.val(""); // to clear input field

        addDeleteButton(listItem);
        addEditButton(listItem);
    });
}

function addDeleteButton(listItem) {
    var deleteImage = $("<button></button>")
        .appendTo(listItem);
    loadPicture(deleteImage, "delete", "../resources/deleteImage.png");
    deleteItem(deleteImage, listItem);
}

function deleteItem(deleteImage, listItem) {
    deleteImage.click(function () {
        listItem.remove();
    });
}

function addEditButton(listItem) {
    var editImage = $("<button></button>")
        .addClass("left-button")
        .appendTo(listItem);
    loadPicture(editImage, "edit", "../resources/editImage.png");
    transformToEditItem(editImage, listItem);
}

function transformToEditItem(imageEdit, listItem) {
    imageEdit.click(function () {
        var textList = listItem.text();
        var editableListItem = $("<li></li>");
        var inputField = $("<input>")
            .addClass("edit-input")
            .attr("type", "text")
            .attr("maxLength", "40")
            .val(textList);

        var cancelImage = $("<button>");
        loadPicture(cancelImage, "cancel", "../resources/cancelImage.png");

        var saveImage = $("<button>")
            .addClass("left-button");
        loadPicture(saveImage, "save", "../resources/saveImage.png");

        listItem.remove();
        editableListItem.appendTo(unorderedList);
        inputField.appendTo(editableListItem);

        cancelImage.appendTo(editableListItem);
        saveImage.appendTo(editableListItem);

        cancelAction(cancelImage, editableListItem, textList);
        saveItem(saveImage, editableListItem, inputField);
    });
}

function saveItem(saveImage, editableListItem, inputField) {
    saveImage.click(function () {
        var textInputField = inputField.val();
        editableListItem.remove();
        returnToInitialListItemState(textInputField);
    });
}

function cancelAction(cancelImage, editableListItem, textList) {
    cancelImage.click(function () {
        editableListItem.remove();
        returnToInitialListItemState(textList);
    });
}

function returnToInitialListItemState(textInputField) {
    var listItem = $("<li></li>")
        .text(textInputField)
        .appendTo(unorderedList);

    addDeleteButton(listItem);
    addEditButton(listItem);
}

function loadPicture(imageButton, name, link) {
    $("<img>")
        .addClass("background-image")
        .attr("alt", name)
        .attr("title", name)
        .attr("src", link)
        .appendTo(imageButton);

    imageButton.addClass("image-button");
}