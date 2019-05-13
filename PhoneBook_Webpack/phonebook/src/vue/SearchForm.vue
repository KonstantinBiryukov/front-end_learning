<template>
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
</template>

<script>
    export default {
        props: {
            isContactFound: Boolean
        },
        data() {
            return {
                searchField: ""
            }
        },
        methods: {
            search() {
                this.$parent.usedSearchTerm = this.searchField;
                this.$parent.loadContacts();
            },
            reset: function () {
                this.$parent.usedSearchTerm = "";
                this.$parent.checkedContactsId = [];
                this.$parent.allChecked = false;
                this.$parent.loadContacts();
            }
        }
    }
</script>

<style>
    .reset-button,
    .search-button {
        width: 80px;
    }

    .contact-not-found {
        position: absolute;
        top: -10px;
        background-color: indianred;
    }
</style>