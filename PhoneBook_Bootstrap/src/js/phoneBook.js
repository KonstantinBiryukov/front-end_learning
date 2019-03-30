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
        clearWarningMessages("invalid-feedback");

        var formFields = getData();
        var contactData = [];
        formFields.forEach(function (value) {
            contactData.push(value.val());
        });

        // if no warning classes currently exists -> starts to listen to the button again and check the validation
        if ($(".invalid-feedback").length !== 0) {
            return;
        }

        clearInputFields(formFields);

        var checkboxWrapper = $("<td></td>");

        // add a contact number and a checkbox wrapper as first elements of a table row
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
    var deleteAllButton = $(".delete-all-button");
    deleteAllButton.attr("data-toggle", "modal");
    deleteAllButton.attr("data-target", "#deleteAllConfirmationDialog");

    deleteAllButton.click(function () {
        var checkedContacts = $(".phone-book tbody input:checked").parent().parent(); // table rows of all checked elements

        var dialogIdName = "deleteAllConfirmationDialog";
        var dialogId = "#" + dialogIdName;
        initConfirmationDialog("", dialogIdName);

        var modalBody = $(".modal-body");
        var modalButtons = $(".modal-footer button");

        if (checkedContacts.length === 0) {
            modalBody.text("There're no checked elements!");
            modalButtons.remove();
            $(dialogId).on("hidden.bs.modal", function () {
                deleteModalDialog();
            });
            return;
        }

        modalBody.text("Would you like to delete ALL checked contacts ?");
        $("#confirm").click(function () {
            checkedContacts.each(function () {
                var allContactNumbers = $(".phone-book tbody tr td:nth-child(2)");
                var rowCurrentNumber = $(this).find("td:nth-child(2)").text();

                $(this).remove();
                recalculateContactNumber(rowCurrentNumber, allContactNumbers);
                $(".phone-book thead input").prop("checked", false); // reset checkbox checker in thead
            });
            deleteModalDialog();
        });

        $(dialogId).on("hidden.bs.modal", function () {
            resetCheckboxes();
            deleteModalDialog();
        });
    });
}

/**
 *  Remove dialog and all its elements;
 *  When any dialog modal is called, a class "modal-open" is automatically added to "body" tag by bootstrap logic.
 *  When a dialog modal is destroyed, "modal-open"'s overflow property automatically changes to 'hidden'.
 *  To prevent this --> "modal-open" class is removed after destroying any dialog modal.
 */
function deleteModalDialog() {
    $(".fade").remove();
    $("body").removeClass("modal-open");
}

function clearInputFields(inputFields) {
    inputFields.forEach(function (value) {
        value.val("");
    });
}

function createDeleteButton(tableRow, tableCell) {
    // create button, add picture and event listener
    var deleteButton = $("<button></button>");
    deleteButton.attr("data-toggle", "modal");
    deleteButton.attr("data-target", "#deleteConfirmationDialog");
    deleteButton.appendTo(tableCell);

    deleteButton.click(function () {
        deleteContact(tableRow);
    });
}

function initConfirmationDialog(dialogText, dialogId) {
    return $("<div class=\"modal fade\" id=\"" + dialogId + "\" tabindex=\"-1\" role=\"dialog\"" +
        " aria-labelledby=\"confirmationDialogTitle\" aria-hidden=\"true\">\n" +
        "  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Delete confirmation</h5>\n" +
        "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
        "          <span aria-hidden=\"true\">&times;</span>\n" +
        "        </button>\n" +
        "      </div>\n" +
        "      <div class=\"modal-body\">\n" + dialogText +
        "      </div>\n" +
        "      <div class=\"modal-footer\">\n" +
        "        <button type=\"button\" class=\"btn btn-secondary\" id=\"cancel\" data-dismiss=\"modal\">NO</button>\n" +
        "        <button type=\"button\" class=\"btn btn-primary\" id=\"confirm\">YES</button>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>\n")
        .appendTo($(".container"));
}

function deleteContact(tableRow) {
    var rowNumber = tableRow.find("td:nth-child(2)").text();
    var allContactNumbers = $(".phone-book tbody tr td:nth-child(2)");

    var dialogText = "Would you like to delete this contact ? (contact number: #" + rowNumber + ")";
    var dialogIdName = "deleteConfirmationDialog";
    var dialogId = "#" + dialogIdName;
    initConfirmationDialog(dialogText, dialogIdName);

    $("#confirm").click(function () {
        tableRow.remove();
        recalculateContactNumber(rowNumber, allContactNumbers);
        deleteModalDialog();
    });

    $(dialogId).on("hidden.bs.modal", function () {
        resetCheckboxes();
        deleteModalDialog();
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

function validateForm(formFields) {
    // for toggling input fields from green to red
    formFields.forEach(function (currentInputField) {
        currentInputField.toggleClass("is-invalid", currentInputField.val() === "");
        currentInputField.toggleClass("is-valid", currentInputField.val() !== "");
    });

    // to define empty fields
    var emptyInputFields = formFields.filter(function (currentInputField) {
        return currentInputField.is(".is-invalid");
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
            .addClass("invalid-feedback")
            .text(currentField.attr("title") + " is not defined!");
        currentField.parent().append(warning);
    });

    var phoneNumber = $("#phone-number");
    var isNumeric = validateNumericPhoneNumber(phoneNumber);
    validateUniquePhoneNumber(phoneNumber, isNumeric);
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
    var regExpPhoneSymbols = /^[\d\s()+-]*$/; // integers, spaces, parentheses, +, \-

    if (!regExpPhoneSymbols.test(phoneNumberValue) && phoneNumberValue !== "") {
        var warning = $("<div></div>")
            .addClass("invalid-feedback")
            .text("Only numbers are permitted");
        phoneNumber.parent().append(warning);

        toggleFormStyleFromBlueToRed();
        return false;
    }
    return true;
}

function validateUniquePhoneNumber(phoneNumber, isNumeric) {
    // choose column #5 in the phone book: phoneNumber column
    var columnNumber = $(".phone-book tbody tr td:nth-child(5)");

    // if there're no columns yet, toggle class according to only "isNumeric" boolean information
    if (columnNumber.length === 0) {
        phoneNumber.toggleClass("is-invalid", !isNumeric || phoneNumber.val() === "");
        phoneNumber.toggleClass("is-valid", isNumeric);
        return;
    }

    // in each column: search for table's phone number that are equal to phone number in input field
    columnNumber.each(function () {
        phoneNumber.toggleClass("is-invalid", $(this).text() === phoneNumber.val() || !isNumeric || phoneNumber.val() === "");
        phoneNumber.toggleClass("is-valid", $(this).text() !== phoneNumber.val() || isNumeric);

        if ($(this).text() === phoneNumber.val()) {
            var warning = $("<div></div>")
                .addClass("invalid-feedback")
                .text(phoneNumber.attr("title") + " is already added");
            phoneNumber.parent().append(warning);

            toggleFormStyleFromBlueToRed();
        }
    });
}

function toggleFormStyleFromBlueToRed() {
    $(".input-form-wrapper").addClass("invalid-form");
    $(".add-contact-title").addClass("message-invalid");
}

function filterContacts() {
    var badge = "badge";
    var warningClassName = "badge-danger";

    // search-button events
    $(".search-button").click(function () {
        var searchingValue = $("#contacts-search").val().toLowerCase();
        var contacts = $(".phone-book tbody tr");
        var searchInterface = $(".search");

        contacts.each(function () { // search functionality
            var contactsInfoRow = $(this).find("td:nth-child(n+3):nth-child(-n+5)");
            var contactsText = contactsInfoRow.text().toLowerCase();
            // hide table row if table row is not found by search request or search string is empty
            $(this).toggle(contactsText.indexOf(searchingValue) !== -1 && searchingValue !== "");
        });

        resetCheckboxes();

        if (!contacts.is(":visible") && !searchInterface.children().hasClass(warningClassName + " " + badge)
            || searchingValue === "") {
            $("<div></div>")
                .addClass(warningClassName + " " + badge + " position-absolute")
                .text("contact not found...")
                .appendTo(searchInterface);
        } else if (contacts.is(":visible")) {
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
        }
    });
}