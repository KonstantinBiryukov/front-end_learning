function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

// register modal component (https://vuejs.org/v2/examples/modal.html)
Vue.component('modal', {
    template: '#modal-template',
    methods: {
        deleteContact: function () {
            this.$emit("delete-contact");
        }
    }
});

new Vue({
    el: "#phone-book",
    data: function () {
        return {
            contacts: [],
            name: "",
            surname: "",
            phoneNumber: "",
            searchField: "",
            usedSearchTerm: "",
            isValidName: true,
            isValidSurname: true,
            isValidPhoneNumber: true,
            invalidMessage: "",
            checked: false,
            checkedContactsId: [],
            allChecked: false,
            showModal: false,
            selectedContact: null,
            isContactFound: true
        }
    },
    created: function () {
        this.loadContacts();
    },
    methods: {
        deleteContact: function () {
            if (this.selectedContact === null) { // re-direct to deleteAll if there're checked contacts
                this.deleteAll();
                this.showModal = false;
                return;
            }
            var self = this;
            post("/deleteContact", {id: this.selectedContact.id}).done(function () {
                self.loadContacts();
            });
            this.showModal = false;

            this.selectedContact = null;
        },
        deleteAll: function () {
            var self = this;
            post("/deleteAll", {id: self.checkedContactsId}).done(function () {
                self.loadContacts();
            });
            this.showModal = false;
            this.allChecked = false;
        },
        addContact: function () {
            var request = {
                contact: {
                    name: this.name,
                    surname: this.surname,
                    phoneNumber: this.phoneNumber
                }
            };

            // empty_fields validation
            if (this.name === "") {
                this.isValidName = false;
            }
            if (this.surname === "") {
                this.isValidSurname = false;
            }
            if (this.phoneNumber === "") {
                this.isValidPhoneNumber = false;
            }
            if (this.name === "" || this.surname === "" || this.phoneNumber === "") {
                this.invalidMessage = "is not defined";
                return;
            }

            this.isValidName = true;
            this.isValidSurname = true;
            this.isValidPhoneNumber = true;

            var self = this;
            post("/addContact", request).done(function (response) {
                var message = response.message;
                if (response.success === false) {
                    self.isValidPhoneNumber = false;
                    self.invalidMessage = message;
                } else {
                    self.name = "";
                    self.surname = "";
                    self.phoneNumber = "";
                    self.loadContacts();
                    self.isValidPhoneNumber = true;
                }
            });
        },
        loadContacts: function () {
            var self = this;
            $.get("/getContacts", {search: this.usedSearchTerm}).done(function (contacts) {
                // if there're no contacts from search, a response's success will be equal to "false"
                self.contacts = contacts.contacts;
                self.isContactFound = contacts.success;

                // if response is came from search function -->
                // --> some checked contacts might be hidden and accidentally deleted as a result;
                // only checkers that was remain after search should be left, the other checkers are reset
                var showedContactsId = [];
                self.contacts.forEach(function (contact) {
                    showedContactsId.push(contact.id);
                });
                // new checked contacts are contacts that checked (checkedContacts) and showed (showedContacts) at the same time
                self.checkedContactsId = _.intersection(showedContactsId, self.checkedContactsId);
            });
        },
        search: function () {
            this.usedSearchTerm = this.searchField;
            this.loadContacts();
        },
        reset: function () {
            this.usedSearchTerm = "";
            this.checkedContactsId = [];
            this.allChecked = false;
            this.loadContacts();
        },
        checkAll: function () {
            this.checkedContactsId = [];
            if (!this.allChecked) {
                var self = this;
                self.contacts.map(function (contact) {
                    self.checkedContactsId.push(contact.id);
                });
            }
        },
        check: function () {
            this.allChecked = false;
        },
        confirmDelete: function (contact) {
            if (this.checkedContactsId.length || contact !== "deleteAll") {
                this.showModal = true;
            }
            if (contact !== "deleteAll") {
                this.selectedContact = contact;
            }
        }
    }
});