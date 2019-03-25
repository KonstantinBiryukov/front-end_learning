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
    var formFields = [surnameField, nameField, phoneNumberField];

    validateForm(formFields);
    return formFields;
}

function initPage() {
    filterContacts();

    $("#add-contact-button").click(function () {
        clearWarningMessages("warning-message");

        var formFields = getData();
        var contactData = [];
        formFields.forEach(function (value) {
            contactData.push(value.val());
        });

        // if no warning classes currently exists -> starts to listen to the button again and check the validation
        if ($(".warning-message").length !== 0) {
            return;
        }

        clearInputFields(formFields);

        var checkboxWrapper = $("<td></td>");

        // add a contact number as a first element of a table row
        ++contactNumber;
        contactData.unshift(contactNumber);
        contactData.unshift(checkboxWrapper.text());

        // create a row and fill it with cells
        var tableRow = $("<tr></tr>")
            .appendTo(".phone-book tbody");

        // a reason of "<= contactData.length" --> extra td for empty column with delete button is required
        var tableCellsArray = [];
        for (var i = 0; i <= contactData.length; i++) {
            tableCellsArray.push($("<td></td>"));
            tableCellsArray[i].appendTo(tableRow);
        }

        var deleteButtonCell = tableCellsArray[5];
        createDeleteButton(tableRow, deleteButtonCell);

        // fill each td with user's input data
        tableCellsArray.forEach(function (value, index) {
            value.text(contactData[index]);
        });

        addCheckbox(tableCellsArray[0]);
        addCheckboxChecker();
    });
    deleteCheckedContacts();
}

// add checkbox to the first column of a table row
function addCheckbox(firstColumn) {
    $("<input>")
        .attr("type", "checkbox")
        .attr("name", "contact")
        .attr("value", contactNumber)
        .appendTo(firstColumn);
}

function addCheckboxChecker() {
    var checker = $(".phone-book thead input");
    var allCheckboxes = $(".phone-book tbody input");

    checker.click(function () {
        if (allCheckboxes.is(":visible")) { // to make sure that hidden contacts (filtered) are not accidentally checked and deleted
            allCheckboxes.prop("checked", $(this).is(":checked"));
        }
    });
}

function deleteCheckedContacts() {
    $(".delete-all-button").click(function () {
        var checkedContacts = $(".phone-book tbody input:checked").parent().parent(); // table rows of all checked elements

        var confirmationElement = $("<span></span>")
            .text("Would you like to delete ALL checked contacts ?")
            .appendTo(".delete-all-button");

        if (checkedContacts.length === 0) {
            confirmationElement.text("There're no checked elements!");
            confirmationElement.dialog({
                modal: true,
                title: "Delete confirmation",
                minHeight: 100,
                minWidth: 350
            });
            return;
        }
        confirmationElement.dialog({
            modal: true,
            title: "Delete confirmation",
            minHeight: 220,
            minWidth: 370,
            buttons: [
                {
                    text: "NO",
                    click: function () {
                        $(this).dialog("close");
                        confirmationElement.remove();
                        resetCheckboxes();
                    }
                },
                {
                    text: "YES",
                    click: function () {
                        $(this).dialog("close");
                        confirmationElement.remove();

                        checkedContacts.each(function () {
                            var allContactNumbers = $(".phone-book tbody tr td:nth-child(2)");
                            var rowCurrentNumber = $(this).find("td:nth-child(2)").text();

                            $(this).remove();
                            recalculateContactNumber(rowCurrentNumber, allContactNumbers);
                            $(".phone-book thead input").prop("checked", false); // reset checkbox checker in thead
                        });
                    }
                }
            ]
        });
    });
}

function clearInputFields(inputFields) {
    inputFields.forEach(function (value) {
        value.val("");
    });
}

function createDeleteButton(tableRow, tableCell) {
    // create button, add picture and event listener
    var deleteButton = $("<button></button>");
    deleteButton.appendTo(tableCell);
    loadPicture(deleteButton, "delete", "../resources/deleteImage.png");

    deleteButton.click(function () {
        deleteContact(tableRow, deleteButton, tableCell);
    });
}

function deleteContact(tableRow, deleteButton, tableCell) {
    var rowNumber = tableRow.find("td:nth-child(2)").text();
    var allContactNumbers = $(".phone-book tbody tr td:nth-child(2)");

    initDeleteConfirmDialog(tableRow, tableCell, rowNumber, allContactNumbers);
}

function initDeleteConfirmDialog(tableRow, tableCell, rowNumber, allContactNumbers) {
    var confirmationElement = $("<span></span>")
        .text("Would you like to delete this contact ?" + " (contact number: #" + rowNumber + ")")
        .appendTo(tableCell);

    confirmationElement.dialog({
        modal: true,
        title: "Delete confirmation",
        minHeight: 220,
        minWidth: 370,
        buttons: [
            {
                text: "NO",
                click: function () {
                    $(this).dialog("close");
                    confirmationElement.remove();
                }
            },
            {
                text: "YES",
                click: function () {
                    tableRow.remove();
                    $(this).dialog("close");
                    confirmationElement.remove();
                    recalculateContactNumber(rowNumber, allContactNumbers);
                }
            }
        ]
    });
}

function recalculateContactNumber(rowNumber, allContactNumbers) {
    contactNumber = allContactNumbers.length - 1; // last table row's index

    allContactNumbers.each(function () {
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
    formFields.forEach(function (currentInputField) {
        currentInputField.toggleClass("invalid-input", currentInputField.val() === "");
    });

    // to define empty fields
    var emptyInputFields = formFields.filter(function (currentInputField) {
        return currentInputField.is(".invalid-input");
    });

    // for toggling a general view of input form from blue to red
    formFields.forEach(function () {
        $(".input-form-wrapper")
            .toggleClass("invalid-form", emptyInputFields.length !== 0);
        $(".add-contact-title").toggleClass("message-invalid", emptyInputFields.length !== 0);
    });

    // to show a warning message for each empty input field
    emptyInputFields.forEach(function (currentField) {
        var warning = $("<div></div>")
            .addClass("warning-message")
            .text(currentField.attr("title") + " is not defined!");
        currentField.parent().append(warning);
    });

    var phoneNumber = $("#phone-number");
    validateNumericPhoneNumber(phoneNumber);
    validateUniquePhoneNumber(phoneNumber);
}

function clearWarningMessages(warningClassName) {
    var warnings = $("." + warningClassName);

    if (warnings.length === 0) { // no messages to clear
        return;
    }
    warnings.remove();
}

function validateNumericPhoneNumber(phoneNumber) {
    var phoneNumberValue = phoneNumber.val();
    var regExpPhoneSymbols = /^[\d\s()+-]*$/; // integers, spaces, parentheses, +, -
    if (!regExpPhoneSymbols.test(phoneNumberValue) && phoneNumberValue !== "") {
        var warning = $("<div></div>")
            .addClass("warning-message")
            .text("Only numbers are permitted!");
        phoneNumber.parent().append(warning);

        toggleFormStyleFromBlueToRed(phoneNumber);
    }
}

function validateUniquePhoneNumber(phoneNumber) {
    // choose column #5 in the phone book: phoneNumber column
    var columnNumber = $(".phone-book tbody tr td:nth-child(5)");

    // in each column: search for table's phone number that are equal to phone number in input field
    columnNumber.each(function () {
        if ($(this).text() === phoneNumber.val()) {
            var warning = $("<div></div>")
                .addClass("warning-message")
                .text(phoneNumber.attr("title") + " is already added...");
            phoneNumber.parent().append(warning);

            toggleFormStyleFromBlueToRed(phoneNumber);
        }
    });
}

function toggleFormStyleFromBlueToRed(phoneNumber) {
    phoneNumber.addClass("invalid-input");
    $(".input-form-wrapper").addClass("invalid-form");
    $(".add-contact-title").addClass("message-invalid");
}

function filterContacts() {
    var warningClassName = "warning-filter";

    // search-button events
    $(".search-button").click(function () {
        var searchingValue = $("#contacts-search").val().toLowerCase();
        var contacts = $(".phone-book tbody tr");

        $(contacts).each(function () { // search functionality
            var contactsInfoRow = $(this).find("td:nth-child(n+3):nth-child(-n+5)");
            var contactsText = contactsInfoRow.text().toLowerCase();
            $(this).toggle(contactsText.indexOf(searchingValue) !== -1);
        });

        resetCheckboxes();

        if (!$(contacts).is(":visible")) {
            $("<div></div>")
                .text("contact not found...")
                .addClass(warningClassName)
                .appendTo($(".header-interface"));
        } else {
            clearWarningMessages(warningClassName);
        }
    });

    // reset-button event
    $(".reset-button").click(function () {
        clearWarningMessages(warningClassName);
        $(".phone-book tbody tr").show();
    });
}

// to reset all checkboxes to make sure that hidden (filtered) contacts are not accidentally deleted by "delete all" button
function resetCheckboxes() {
    var checkboxChecker = $(".phone-book thead input");
    var contacts = $(".phone-book tbody tr");

    contacts.each(function () {
        var currentCheckbox = $(this).find("input");
        // to reset checkbox if it was checked but now it's hidden
        if (!$(this).is(":visible") && currentCheckbox.prop("checked") === true) {
            currentCheckbox.prop("checked", false);
            checkboxChecker.prop("checked", false);
        } else {
            checkboxChecker.prop("checked", true);
        }
    });
}