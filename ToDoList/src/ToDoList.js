//  Создать простую программу TO DO List
// • Есть список записей (поначалу пустой), поле ввода и кнопка для добавления записи
// • По нажатию на кнопку в конец списка должна добавиться запись с текстом из поля ввода. При этом поле ввода очищается
// • Рядом с каждым элементом списка есть кнопка удаления
// • * Можно еще сделать рядом кнопку редактирования – по нажатию вместо текста появляется поле ввода с текстом,
// а вместо кнопки редактирования – появляются кнопки «Отменить» и «Сохранить»

var unorderedList = document.getElementById("notes");

function addToList() {
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
    var deleteImage = document.createElement("input");
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
    var editImage = document.createElement("input");
    loadPicture(editImage, "edit", "../resources/editImage.png");
    editImage.style.marginLeft = "15px";
    listItem.appendChild(editImage);
    transformToEditItem(editImage, listItem);
}

function transformToEditItem(imageEdit, listItem) {
    imageEdit.addEventListener("click", function () {
        var textList = listItem.textContent;
        var editableListItem = document.createElement("li");
        var inputField = document.createElement("input");

        inputField.type = "text";
        inputField.maxLength = 40;
        inputField.value = textList;
        inputField.style.padding = "1px";
        inputField.style.width = "250px";

        var cancelImage = document.createElement("input");
        loadPicture(cancelImage, "cancel", "../resources/cancelImage.png");

        var saveImage = document.createElement("input");
        loadPicture(saveImage, "save", "../resources/saveImage.png");
        saveImage.style.marginLeft = "15px";

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

function loadPicture(image, name, link) {
    image.type = "image";
    image.alt = name;
    image.title = name;
    image.src = link;
    image.style.cssText = "height: 18px; \
                    float: right;\
                    margin-left: 3px;\
                    ";
}

document.addEventListener("DOMContentLoaded", addToList);