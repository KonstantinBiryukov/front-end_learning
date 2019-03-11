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
    });
}

function addDeleteButton(listItem) {
    var imgDelete = document.createElement("input");
    imgDelete.type = "image";
    imgDelete.alt = "delete";
    imgDelete.title = "delete";
    imgDelete.src = "../resources/deleteImage.png";
    imgDelete.style.cssText = "height: 18px; \
                    float: right;\
                    margin-left: 15px;\
                    ";
    listItem.appendChild(imgDelete);
    deleteItem(imgDelete, listItem);
}

function deleteItem(imgDelete, listItem) {
    imgDelete.addEventListener("click", function () {
        unorderedList.removeChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", addToList);