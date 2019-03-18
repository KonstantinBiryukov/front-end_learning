"use strict";

//DOMContentLoaded
$(function () {
    initPage();
});

var contactNumber = 0;
var isLastElementDeleted = false;

function getData() {
    var surnameField = $("#surname");
    var nameField = $("#name");
    var phoneNumberField = $("#phone-number");

    var surnameText = surnameField.val();
    var nameText = nameField.val();
    var phoneNumberText = phoneNumberField.val();
    var formAllText = [surnameField, nameField, phoneNumberField];

    validateForm(formAllText);

    clearInputFields(formAllText);
    return [surnameText, nameText, phoneNumberText];
}

function initPage() {
    $("#add-contact-button").click(function () {
        clearWarningMessages();
        var contactData = getData();
        if ($(".warning-message").length !== 0) {
            return;
        }
        addContactNumber(contactData);

        // create a row and fill it with cells
        var tableRow = $("<tr></tr>");
        $(tableRow).appendTo(".phone-book tbody");

        var tableCellsArray = [];
        for (var i = 0; i < 5; i++) {
            tableCellsArray.push($("<td></td>"));
            tableCellsArray[i].appendTo(tableRow);
        }

        var deleteButtonCell = tableCellsArray[4];
        createDeleteButton(tableRow, deleteButtonCell);

        $.each(tableCellsArray, function (index, value) {
            value.text(contactData[index]);
        });
    });
}

// add a contact number as a first element of a table row
function addContactNumber(contactData) {
    contactData.unshift(++contactNumber);
    isLastElementDeleted = false;


    // if (isLastElementDeleted) {
    //     contactNumber = contactNumber + 2;
    //     contactData.unshift(contactNumber);
    //     isLastElementDeleted = false;
    // } else {
    //     contactData.unshift(++contactNumber);
    // }
}

function clearInputFields(inputFields) {
    $.each(inputFields, function (index, value) {
        value.val("");
    });
}

function createDeleteButton(tableRow, tableCell) {
    //createButton, loadPicture and addListener
    var deleteButton = $("<button></button>");
    deleteButton.appendTo(tableCell);
    loadPicture(deleteButton, "delete", "../resources/deleteImage.png");
    deleteContact(tableRow, deleteButton);
}

function deleteContact(tableRow, deleteButton) {
    deleteButton.click(function () {
        var rowNumber = tableRow.find("td:first-child").text();
        var numberContactCell = $(".phone-book tbody tr td:first-child");
        tableRow.remove();
        recalculateContactNumber(rowNumber, numberContactCell);
    });
}

function recalculateContactNumber(rowNumber, numberContactCell) {
    isLastElementDeleted = true;

    numberContactCell.each(function (rowIndex) {
        contactNumber = rowIndex; // last table row's index
        if (Number($(this).text()) <= Number(rowNumber)) {
            return;
        }
        $(this).text(Number($(this).text()) - Number(1));
    });
}

function loadPicture(imageButton, name, link) {
    $("<img>")
        .addClass("background-image")
        .attr("title", name.charAt(0).toUpperCase() + name.slice(1))
        .attr("src", link)
        .attr("alt", name)
        .appendTo(imageButton);
}

function validateForm(formAllText) {
    // for toggling input fields from blue to red
    $.each(formAllText, function () {
        $(this).toggleClass("invalid-input", $(this).val() === "");
    });

    // to define empty fields
    var emptyInputFields = $.grep(formAllText, function (input) {
        return $(input).is(".invalid-input");
    });

    // for toggling a general view of input form from blue to red
    $.each(formAllText, function () {
        $(".input-form-wrapper")
            .toggleClass("invalid-form", emptyInputFields.length !== 0);
        $(".add-contact-title").toggleClass("message-invalid", emptyInputFields.length !== 0);
    });

    // to show a warning message for each empty input field
    $(emptyInputFields).each(function () {
        var warning = $("<div></div>")
            .addClass("warning-message")
            .text(this.attr("title") + " is not defined!");
        this.parent().append(warning);
    });

    validatePhoneNumber();
    validateUniqueInput(formAllText);
}

function validateUniqueInput(formAllText) {
    $.each(formAllText, function (index, value) {

    })
}

function clearWarningMessages() {
    var warning = $(".warning-message");

    if (warning.length === 0) { // no messages to clear
        return;
    }
    warning.each(function () {
        $(this).remove();
    });
}

function validatePhoneNumber() {
    var phoneNumber = $("#phone-number");
    if (!$.isNumeric(phoneNumber.val()) && phoneNumber.val() !== "") {
        var warning = $("<div></div>")
            .addClass("warning-message")
            .text("Only numbers are permitted!");
        phoneNumber.parent().append(warning);

        // toggle form's style from blue to red
        phoneNumber.addClass("invalid-input");
        $(".input-form-wrapper").addClass("invalid-form");
        $(".add-contact-title").addClass("message-invalid");
    }
}