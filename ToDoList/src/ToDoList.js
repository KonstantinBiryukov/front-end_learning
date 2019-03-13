//  Создать простую программу TO DO List
// • Есть список записей (поначалу пустой), поле ввода и кнопка для добавления записи
// • По нажатию на кнопку в конец списка должна добавиться запись с текстом из поля ввода. При этом поле ввода очищается
// • Рядом с каждым элементом списка есть кнопка удаления
// • * Можно еще сделать рядом кнопку редактирования – по нажатию вместо текста появляется поле ввода с текстом,
// а вместо кнопки редактирования – появляются кнопки «Отменить» и «Сохранить»

"use strict";

var unorderedList;

function addToList() {
    unorderedList = document.getElementById("notes");
    var additionButton = document.getElementById("add-button");
    additionButton.addEventListener("click", function () {
        var inputField = document.getElementById("add-element-field");
        var inputDataValue = inputField.value;
        if (inputDataValue.trim().length === 0) {
            return;
        }
        var listItem = document.createElement("li");

        listItem.textContent = inputDataValue;
        unorderedList.appendChild(listItem);
        inputField.value = "";
        addDeleteButton(listItem);
        addEditButton(listItem);
    });
}

function addDeleteButton(listItem) {
    var deleteImage = document.createElement("button");
    loadPicture(deleteImage, "delete", "../resources/deleteImage.png");
    listItem.appendChild(deleteImage);
    deleteItem(deleteImage, listItem);
}

function deleteItem(deleteImage, listItem) {
    deleteImage.addEventListener("click", function () {
        unorderedList.removeChild(listItem);
    });
}

function addEditButton(listItem) {
    var editImage = document.createElement("button");
    loadPicture(editImage, "edit", "../resources/editImage.png");

    editImage.classList.add("left-button");
    listItem.appendChild(editImage);
    transformToEditItem(editImage, listItem);
}

function transformToEditItem(imageEdit, listItem) {
    imageEdit.addEventListener("click", function () {
        var textList = listItem.textContent;
        var editableListItem = document.createElement("li");
        var inputField = document.createElement("input");

        inputField.className = "edit-input";
        inputField.type = "text";
        inputField.maxLength = 40;
        inputField.value = textList;

        var cancelImage = document.createElement("button");
        loadPicture(cancelImage, "cancel", "../resources/cancelImage.png");

        var saveImage = document.createElement("button");
        loadPicture(saveImage, "save", "../resources/saveImage.png");
        saveImage.classList.add("left-button");

        unorderedList.removeChild(listItem);
        unorderedList.appendChild(editableListItem);
        editableListItem.appendChild(inputField);

        editableListItem.appendChild(cancelImage);
        editableListItem.appendChild(saveImage);

        cancelAction(cancelImage, editableListItem, textList);
        saveItem(saveImage, editableListItem, inputField);
    });
}

function saveItem(saveImage, editableListItem, inputField) {
    saveImage.addEventListener("click", function () {
        var textInputField = inputField.value;
        unorderedList.removeChild(editableListItem);
        returnToInitialListItemState(textInputField);
    });
}

function cancelAction(cancelImage, editableListItem, textList) {
    cancelImage.addEventListener("click", function () {
        unorderedList.removeChild(editableListItem);
        returnToInitialListItemState(textList);
    });
}

function returnToInitialListItemState(text) {
    var listItem = document.createElement("li");
    listItem.textContent = text;
    unorderedList.appendChild(listItem);
    addDeleteButton(listItem);
    addEditButton(listItem);
}

function loadPicture(imageButton, name, link) {
    var image = document.createElement("img");
    imageButton.appendChild(image);
    imageButton.classList.add("image-button");
    image.classList.add("background-image");
    image.alt = name;
    image.title = name;
    image.src = link;
}

document.addEventListener("DOMContentLoaded", addToList);