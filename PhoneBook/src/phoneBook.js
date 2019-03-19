"use strict";

//DOMContentLoaded
$(function () {
    initPage();
});

var contactNumber = 0;

function getData() {
    var surnameField = $("#surname");
    var nameField = $("#name");
    var phoneNumberField = $("#phone-number");

    var surnameText = surnameField.val();
    var nameText = nameField.val();
    var phoneNumberText = phoneNumberField.val();
    var formFields = [surnameField, nameField, phoneNumberField];

    validateForm(formFields);

    clearInputFields(formFields);
    return [surnameText, nameText, phoneNumberText];
}

function initPage() {
    $("#add-contact-button").click(function () {
        clearWarningMessages();
        var contactData = getData();
        if ($(".warning-message").length !== 0) {
            return;
        }
        // add a contact number (increment) as a first element of a table row
        contactData.unshift(++contactNumber);

        // create a row and fill it with cells
        var tableRow = $("<tr></tr>")
            .appendTo(".phone-book tbody");

        var tableCellsArray = [];

        // a reason of "contactData.length + 1" --> for empty column with delete buttons
        for (var i = 0; i < contactData.length + 1; i++) {
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

function validateForm(formFields) {
    // for toggling input fields from blue to red
    $.each(formFields, function () {
        $(this).toggleClass("invalid-input", $(this).val() === "");
    });

    // to define empty fields
    var emptyInputFields = $.grep(formFields, function (input) {
        return $(input).is(".invalid-input");
    });

    // for toggling a general view of input form from blue to red
    $.each(formFields, function () {
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

    var phoneNumber = $("#phone-number");
    validateNumericPhoneNumber(phoneNumber);
    validateUniquePhoneNumber(phoneNumber);
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

function validateNumericPhoneNumber(phoneNumber) {
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

function validateUniquePhoneNumber(phoneNumber) {
    // choose columns #4 in the phone book: phoneNumber column
    var columnNumber = $(".phone-book tbody tr td:nth-child(4)");

    // in each column: search for table's phone number that are equal to phone number in input field
    columnNumber.each(function () {
        if ($(this).text() === phoneNumber.val()) {
            var warning = $("<div></div>")
                .addClass("warning-message")
                .text(phoneNumber.attr("title") + " is already added...");
            phoneNumber.parent().append(warning);
        }
    });
}