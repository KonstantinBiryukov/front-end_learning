<template>
    <div class="container" id="phone-book">
        <p class="h1 title align-middle font-weight-bold">Phone Book</p>

        <div class="row">
            <div class="header-interface">
                <search-form v-bind:isContactFound="isContactFound" v-on:search="search"
                             v-on:reset="reset"></search-form>
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
            <contact-form></contact-form>
        </div>
    </div>
</template>

<script>
    import phoneBookService from "../javascripts/phoneBookService";
    import "bootstrap/dist/css/bootstrap.css";
    import "bootstrap/dist/js/bootstrap.bundle.js";
    import _ from "underscore";
    import contactForm from "./ContactForm.vue";
    import modal from "./Modal.vue";
    import searchForm from "./SearchForm.vue";

    export default {
        components: {
            modal,
            contactForm,
            searchForm
        },
        data() {
            return {
                contacts: [],
                usedSearchTerm: "",
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
                phoneBookService.deleteContact(this.selectedContact.id).done(() => {
                    this.loadContacts();
                });

                this.showModal = false;
                this.selectedContact = null;
            },
            deleteAll() {
                phoneBookService.deleteAll(this.checkedContactsId).done(() => {
                    this.loadContacts();
                });
                this.showModal = false;
                this.allChecked = false;
            },
            loadContacts() {
                phoneBookService.getContacts(this.usedSearchTerm).done(contacts => {
                    // if there're no contacts from search, a response's success will be equal to "false"
                    this.contacts = contacts.contacts;
                    this.isContactFound = contacts.success;

                    // if response is came from search function -->
                    // --> some checked contacts might be hidden and accidentally deleted as a result;
                    // only checkers that was remain after search should be left, the other checkers are reset
                    const showedContactsId = this.contacts.map(contact => {
                        return contact.id;
                    });

                    // new checked contacts are contacts that checked (checkedContacts) and showed (showedContacts) at the same time
                    this.checkedContactsId = _.intersection(showedContactsId, this.checkedContactsId);
                });
            },
            checkAll() {
                this.checkedContactsId = [];
                if (!this.allChecked) {
                    this.checkedContactsId = this.contacts.map(contact => {
                        return contact.id;
                    });
                }
            },
            check() {
                this.allChecked = false;
            },
            confirmDelete(contact) {
                if (this.checkedContactsId.length || contact !== "deleteAll") {
                    this.showModal = true;
                }
                if (contact !== "deleteAll") {
                    this.selectedContact = contact;
                }
            },
            search(searchField) {
                this.usedSearchTerm = searchField;
                this.loadContacts();
            },
            reset: function () {
                this.usedSearchTerm = "";
                this.checkedContactsId = [];
                this.allChecked = false;
                this.loadContacts();
            }
        }
    }
</script>

<style lang="scss">
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

    /* general buttons' styles */
    .input-form-wrapper .add-button {
        border-radius: 7px;
        font-weight: bold;
        margin: 15px auto;
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

    .show-modal {
        background-size: cover;
        background-image: url("../images/deleteImage.png");
        background-repeat: no-repeat;
    }
</style>