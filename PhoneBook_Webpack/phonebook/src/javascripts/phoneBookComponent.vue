<template>
    <div class="container" id="phone-book">
        <p class="h1 title align-middle font-weight-bold">Phone Book</p>

        <div class="row">
            <div class="header-interface">
                <nav class="search-field navbar navbar-light bg-light interface-col text-center d-inline-block">
                    <div class="form-inline search">
                        <div class="contact-not-found" v-cloak v-show="!isContactFound">Contact not found...</div>
                        <input class="form-control mr-sm-2" id="contacts-search" type="search"
                               placeholder="Search contact"
                               aria-label="Search" maxlength="25"
                               v-model="searchField">
                        <button class="btn btn-outline-primary my-2 mx-sm-2 search-button" type="button"
                                @click="search">Search
                        </button>
                        <button class="btn btn-outline-secondary my-2 mx-2 reset-button" type="button"
                                @click="reset">Reset
                        </button>
                    </div>
                </nav>
                <div class="interface-col col-md-2 text-center d-inline-block" id="delete-all-interface">
                    <div class="delete-all-button-wrapper my-3">
                        <button type="button" class="btn btn-danger delete-all-button"
                                title="Delete all checked contacts" @click="confirmDelete('deleteAll')">
                            Delete all checked contacts
                        </button>
                        <modal v-if="showModal" @close="showModal = false" @delete-contact="deleteContact">
                            <h5 v-cloak slot="header">Delete confirmation</h5>
                        </modal>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <table class="col-xl-8 col-md-8 table table-striped table-responsive-md phone-book">
                <thead class="thead-dark">
                <tr>
                    <th class="align-middle">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" name="checkboxes"
                                   v-model="allChecked" @click="checkAll">
                        </label>
                    </th>
                    <th class="align-middle">№</th>
                    <th class="align-middle">Surname</th>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">Phone number</th>
                    <th class="align-middle"></th>
                </tr>
                </thead>
                <tbody v-cloak v-if="contacts.length">
                <tr v-for="(contact, index) in contacts" :key="contact.id">
                    <td><input type="checkbox" name="contact" :value="contact.id"
                               v-model="checkedContactsId" @click="check"></td>
                    <td v-text="index + 1"></td>
                    <td v-text="contact.surname"></td>
                    <td v-text="contact.name"></td>
                    <td v-text="contact.phoneNumber"></td>
                    <td>
                        <button class="show-modal" title="Delete contact" @click="confirmDelete(contact)"></button>
                        <modal v-if="showModal" @close="showModal = false" @delete-contact="deleteContact">
                            <h5 slot="header">Delete confirmation</h5>
                        </modal>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="col-xl-4 col-md-4 main-interface-wrapper needs-validation">
                <div class="form-row input-form-wrapper">
                    <h2 class="add-contact-title w-100 text-center font-weight-bold font-italic">Add contact to phone
                        book</h2>
                    <div class="input-col w-100">
                        <label class="d-block">Surname:
                            <input type="text" class="form-control" id="surname" title="Surname" maxlength="25"
                                   v-model="name" :class="[isValidName ? 'is-valid' : 'is-invalid']">
                            <div v-if="!isValidName" :class="{'invalid-feedback': !isValidName}"
                                 v-text="'Surname ' + invalidMessage"></div>
                        </label>
                    </div>
                    <div class="input-col w-100">
                        <label class="d-block">Name:
                            <input type="text" class="form-control" id="name" title="Name" maxlength="20"
                                   v-model="surname" :class="[isValidSurname ? 'is-valid' : 'is-invalid']">
                            <div v-if="!isValidSurname" :class="{'invalid-feedback': !isValidSurname}"
                                 v-text="'Name ' + invalidMessage"></div>
                        </label>
                    </div>
                    <div class="input-col w-100">
                        <label class="d-block">Phone number:
                            <input type="text" class="form-control" id="phone-number" title="Phone number"
                                   maxlength="10" v-model="phoneNumber"
                                   :class="[isValidPhoneNumber ? 'is-valid' : 'is-invalid']">
                            <div v-if="!isValidPhoneNumber" :class="{'invalid-feedback': !isValidPhoneNumber}"
                                 v-text="'Phone number ' + invalidMessage"></div>
                        </label>
                    </div>
                    <button class="btn btn-primary add-button" id="add-contact-button" type="button"
                            @click="addContact">Add to phone book
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as phoneBookService from "./phoneBookService";
    import "../../node_modules/bootstrap/dist/css/bootstrap.css";
    import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
    import _ from "../../node_modules/underscore/underscore";

    export default {
        data() {
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
        created() {
            this.loadContacts();
        },
        methods: {
            deleteContact() {
                if (this.selectedContact === null) { // re-direct to deleteAll if there're checked contacts
                    this.deleteAll();
                    this.showModal = false;
                    return;
                }
                phoneBookService.deleteContact({id: this.selectedContact.id}).done(() => {
                    this.loadContacts();
                });

                this.showModal = false;
                this.selectedContact = null;
            },
            deleteAll() {
                phoneBookService.deleteAll({id: this.checkedContactsId}).done(() => {
                    this.loadContacts();
                });
                this.showModal = false;
                this.allChecked = false;
            },
            addContact() {
                let request = {
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
                    this.invalidMessage = `is not defined`;
                    return;
                }

                this.isValidName = true;
                this.isValidSurname = true;
                this.isValidPhoneNumber = true;

                phoneBookService.addContact(request).done(response => {
                    let message = response.message;
                    if (response.success === false) {
                        this.isValidPhoneNumber = false;
                        this.invalidMessage = message;
                    } else {
                        this.name = "";
                        this.surname = "";
                        this.phoneNumber = "";
                        this.loadContacts();
                        this.isValidPhoneNumber = true;
                    }
                });
            },
            loadContacts() {
                phoneBookService.getContacts({search: this.usedSearchTerm}).done(contacts => {
                    // if there're no contacts from search, a response's success will be equal to "false"
                    this.contacts = contacts.contacts;
                    this.isContactFound = contacts.success;

                    // if response is came from search function -->
                    // --> some checked contacts might be hidden and accidentally deleted as a result;
                    // only checkers that was remain after search should be left, the other checkers are reset
                    let showedContactsId = [];
                    this.contacts.forEach(contact => {
                        showedContactsId.push(contact.id);
                    });
                    // new checked contacts are contacts that checked (checkedContacts) and showed (showedContacts) at the same time
                    this.checkedContactsId = _.intersection(showedContactsId, this.checkedContactsId);
                });
            },
            search() {
                this.usedSearchTerm = this.searchField;
                this.loadContacts();
            },
            reset: function () {
                this.usedSearchTerm = "";
                this.checkedContactsId = [];
                this.allChecked = false;
                this.loadContacts();
            },
            checkAll() {
                this.checkedContactsId = [];
                if (!this.allChecked) {
                    this.contacts.map(contact => {
                        this.checkedContactsId.push(contact.id);
                    });
                }
            },
            check() {
                this.allChecked = false;
            },
            confirmDelete(contact) {
                if (this.checkedContactsId.length || contact !== `deleteAll`) {
                    this.showModal = true;
                }
                if (contact !== `deleteAll`) {
                    this.selectedContact = contact;
                }
            }
        }
    }
</script>

<style lang="scss">
    $dark-blue-border: 2px dashed darkblue;
    $dark-red-border: 2px dashed darkred;

    @mixin title {
        font-size: 30px;
        margin: 30px;
        text-decoration: underline;
    }

    [v-cloak] {
        display: none;
    }

    .title {
        @include title
    }

    .header-interface {
        padding-bottom: 15px;
    }

    /* contacts table */
    .phone-book {
        margin-bottom: 20px; /*for browser's stretching*/
    }

    .phone-book {
        th, td {
            border: 2px solid black;
            text-align: center;
        }
    }

    /* input form */
    .input-form-wrapper {
        border: $dark-blue-border;
        box-shadow: 0 0 20px rgba(0, 0, 50, 0.5);
    }

    .add-contact-title {
        border-bottom: $dark-blue-border;
        padding: 15px;
        font-size: 17px;
        background-color: rgba(0, 0, 255, 0.1);
    }

    .input-form-wrapper label {
        margin: 5px 20px;
    }

    input[type="text"] {
        padding: 3px 5px;
        border: 1px solid cornflowerblue;
    }

    /* general buttons' styles */
    .input-form-wrapper .add-button {
        border-radius: 7px;
        font-weight: bold;
        margin: 15px auto;
    }

    .reset-button,
    .search-button {
        width: 80px;
    }

    /* dynamic items */
    .background-image {
        width: 20px;
    }

    .phone-book {
        tbody tr td:last-child button {
            height: 25px;
            width: 25px;
        }

        thead tr th:last-child {
            width: 50px;
        }
    }

    .invalid-form {
        border: $dark-red-border;
        box-shadow: 0 0 20px rgba(250, 0, 0, 0.5);
    }

    .message-invalid {
        background-color: rgba(200, 0, 0, 0.5);
        border-bottom: $dark-red-border;
    }

    .badge {
        top: -10px;
    }

    /*delete-all-checked-contact button*/
    .delete-all-button {
        width: 230px;
    }

    button[data-target="#deleteConfirmationDialog"] {
        background-size: cover;
        background-image: url("../images/deleteImage.png");
        background-repeat: no-repeat;
    }

    /*modal-window: https://vuejs.org/v2/examples/modal.html*/
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h5 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    #yes, #close {
        width: 100px;
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .show-modal {
        background-size: cover;
        background-image: url("../images/deleteImage.png");
        background-repeat: no-repeat;
    }

    .contact-not-found {
        position: absolute;
        top: -10px;
        background-color: indianred;
    }
</style>