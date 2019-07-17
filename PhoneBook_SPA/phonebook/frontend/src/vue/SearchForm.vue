<template>
    <nav class="search-field navbar navbar-light bg-light interface-col text-center d-inline-block">
        <v-form id="search-form">
            <div class="form-inline search">
                <v-flex>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                                type="search"
                                aria-label="Search" maxlength="25"
                                placeholder="Search contact"
                                outline
                                clearable
                                v-model="searchField"
                                :rules="searchRules"
                        ></v-text-field>
                    </v-form>
                </v-flex>

                <v-btn class="search-button" color="info" @click="$emit('search', searchField)">Search
                    <v-icon right>search</v-icon>
                </v-btn>
                <v-btn class="reset-button yellow lighten-3" @click="$emit('reset')">Reset
                    <v-icon right>backspace</v-icon>
                </v-btn>
            </div>
        </v-form>
    </nav>
</template>

<script>
    export default {
        props: {
            isContactFound: Boolean
        },
        data() {
            return {
                searchField: "",
                searchRules: [
                    value => this.isContactFound === true || "Contact not found..."
                ]
            }
        },
        watch: {
            isContactFound: function () {
                return this.$refs.form.validate();
            }
        }
    }
</script>

<style>
    .reset-button,
    .search-button {
        width: 120px;
    }
</style>