<template>
    <div class="container" id="phone-book">
        <p class="h1 title align-middle font-weight-bold">Phone Book</p>

        <div class="row">
            <div class="header-interface">
                <search-form v-bind:isContactFound="isContactFound" v-on:search="search"
                             v-on:reset="reset"></search-form>
                <v-btn class="delete-all-button red lighten-3"
                       @click="deleteAll">
                    Delete all checked contacts
                </v-btn>
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
                                    @click="deleteContact(props.item)">
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>
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
                contacts: [],
                checked: false,
                checkedContactsId: [],
                allChecked: false,
                showModal: false,
                selectedContact: null,
                isContactFound: true,
                dialog: false,
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
        watch: {
            dialog(val) {
                val || this.close()
            }
        },
        created() {
            this.loadContacts();
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
            deleteContact(item) {
                const index = this.contacts.indexOf(item);
                confirm('Are you sure you want to delete this contact?') && this.contacts.splice(index, 1);

                // if contact was removed from front-end, we need to remove it from back-end
                if (this.contacts.indexOf(item) === -1) {
                    phoneBookService.deleteContact(item.id).done(() => {
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
            confirmDelete(contact) {
                if (this.checkedContactsId.length || contact !== "deleteAll") {
                    this.showModal = true;
                }
                if (contact !== "deleteAll") {
                    this.selectedContact = contact;
                }
            },
            deleteAll() {
                // remove contacts from front-end
                if (confirm('Are you sure you want to delete selected contacts?')) {
                    for (let i = 0; i < this.selected.length; i++) {
                        let index = this.contacts.indexOf(this.selected[i]);
                        let id = this.selected[i].id;
                        this.checkedContactsId.push(id);
                        this.contacts.splice(index, 1);
                    }
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
        margin: 30px;
        text-decoration: underline;
    }

    .title {
        @include title
    }

    .header-interface {
        padding-bottom: 15px;
    }

    /*delete-all-checked-contact button*/
    .delete-all-button {
        width: 230px;
    }

    .table-flex {
        overflow: auto;
    }
</style>