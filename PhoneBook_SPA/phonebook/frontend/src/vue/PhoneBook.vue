<template>
    <div class="container pl-0" id="phone-book">
        <div class="row">
            <p class="h1 title font-weight-bold">Phone Book</p>
        </div>

        <div class="row">
            <div class="header-interface">
                <search-form v-bind:isContactFound="isContactFound" v-on:search="search"
                             v-on:reset="reset"></search-form>

                <v-btn class="delete-all-button red lighten-3"
                       @click.stop="dialogDeleteAll = true">
                    Delete all checked contacts
                </v-btn>

                <v-dialog persistent v-model="dialogDeleteAll" max-width="290">
                    <v-card v-if="this.selected.length">
                        <v-card-title class="headline">Delete confirmation</v-card-title>
                        <v-card-text>Are you sure you want to delete checked contacts ?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="dialogDeleteAll = false">NO</v-btn>
                            <v-btn color="green darken-1" flat @click="deleteAll">YES</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card v-else>
                        <v-card-title color="red">ERROR</v-card-title>
                        <v-card-text>No contacts checked</v-card-text>
                        <v-btn color="red" flat @click="dialogDeleteAll = false">OK</v-btn>
                    </v-card>
                </v-dialog>

            </div>
        </div>

        <div class="row">
            <v-toolbar flat color="white">
                <v-toolbar-title>Contacts</v-toolbar-title>
            </v-toolbar>
            <v-flex class="table-flex">

                <v-data-table
                        :headers="headers"
                        :items="contacts"
                        class="elevation-1"
                        v-model="selected"
                        select-all>
                    <template v-slot:items="props">
                        <td>
                            <v-checkbox
                                    v-model="props.selected"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>
                        <td class="justify-center">{{ props.index + 1}}</td>
                        <td class="justify-center" v-text="props.item.surname">{{ props.item.surname }}</td>
                        <td class="justify-center">{{ props.item.name }}</td>
                        <td class="justify-center">{{ props.item.phoneNumber }}</td>
                        <td>
                            <v-icon class="justify-center red lighten-3"
                                    @click.stop="dialogDeleteContact = true" @click="setChosenContact(props.item)">
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>

                <v-dialog persistent v-model="dialogDeleteContact" max-width="290">
                    <v-card>
                        <v-card-title class="headline">Delete confirmation</v-card-title>
                        <v-card-text>Are you sure you want to delete this contact ?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="dialogDeleteContact = false">NO</v-btn>
                            <v-btn color="green darken-1" flat @click="deleteContact">YES</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-flex>
            <contact-form></contact-form>
        </div>
    </div>
</template>

<script>
    import phoneBookService from "../javascripts/phoneBookService";
    import contactForm from "./ContactForm.vue";
    import searchForm from "./SearchForm.vue";
    import "bootstrap/dist/css/bootstrap.css";
    import "bootstrap/dist/js/bootstrap.bundle.js";
    import _ from "underscore"
    import "vuetify/dist/vuetify.min.css";

    export default {
        components: {
            contactForm,
            searchForm
        },
        data() {
            return {
                chosenContact: "",
                contacts: [],
                checked: false,
                checkedContactsId: [],
                allChecked: false,
                showModal: false,
                selectedContact: null,
                isContactFound: true,
                dialogDeleteContact: false,
                dialogDeleteAll: false,
                selected: [],
                headers: [
                    {text: '#', value: 'number',},
                    {text: 'Surname', value: 'surname'},
                    {text: 'Name', value: 'name'},
                    {text: 'Phone number', value: 'phoneNumber'},
                    {text: 'Actions', value: 'action', sortable: false}
                ]
            }
        },
        created() {
            this.loadContacts();
        },
        methods: {
            setChosenContact(contact) {
                this.chosenContact = contact;
            },
            deleteContact() {
                this.dialogDeleteContact = false;
                const index = this.contacts.indexOf(this.chosenContact);
                this.contacts.splice(index, 1);

                // if contact was removed from front-end, we need to remove it from back-end
                if (this.contacts.indexOf(this.chosenContact) === -1) {
                    phoneBookService.deleteContact(this.chosenContact.id).done(() => {
                        this.loadContacts();
                    });
                }

                this.showModal = false;
                this.selectedContact = null;
            },
            loadContacts() {
                phoneBookService.getContacts(this.$store.state.usedSearchTerm).done(contacts => {

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
            deleteAll() {
                this.dialogDeleteAll = false;

                // remove contacts from front-end
                for (let i = 0; i < this.selected.length; i++) {
                    let index = this.contacts.indexOf(this.selected[i]);
                    let id = this.selected[i].id;
                    this.checkedContactsId.push(id);
                    this.contacts.splice(index, 1);
                }
                //remove contacts from back-end
                phoneBookService.deleteAll(this.checkedContactsId).done(() => {
                    this.loadContacts();
                });
            },
            search(searchField) {
                this.$store.commit("changeSearch", searchField);
                this.loadContacts();
            },
            reset() {
                this.$store.commit("changeSearch", "");
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
        text-decoration: underline;
    }

    .title {
        @include title
    }

    .header-interface {
        padding-bottom: 15px;
    }

    .delete-all-button {
        margin-bottom: 9px;
    }

    .table-flex {
        overflow: auto;
    }
</style>