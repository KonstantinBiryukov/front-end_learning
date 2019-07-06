<template>
    <div id="add-contact-form" class="col-xl-4 col-md-4 mt-4">
        <div class="input-form-wrapper">
            <v-form class="add-form"
                    lazy-validation v-model="valid"
                    ref="form">
                <div>
                    <h4>Add contact to phone book</h4>
                    <v-text-field id="surname"
                                  label="Surname"
                                  v-model="surname"
                                  :rules="surnameRules"
                                  :counter="25"
                                  maxlength="25"
                                  required
                                  outline>
                    </v-text-field>
                    <v-text-field
                            label="Name"
                            v-model="name"
                            :rules="nameRules"
                            :counter="20"
                            maxlength="20"
                            required
                            outline>
                    </v-text-field>
                    <v-text-field
                            label="Phone Number"
                            v-model="phoneNumber"
                            :rules="phoneRules"
                            :counter="20"
                            maxlength="20"
                            required
                            outline
                            @change="isValidPhoneNumber = true">
                    </v-text-field>
                    <v-btn align-center @click="addContact">Add to phone book</v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>


<script>
    import phoneBookService from "../javascripts/phoneBookService";

    export default {
        data() {
            return {
                name: "",
                surname: "",
                phoneNumber: "",
                isValidPhoneNumber: true,
                invalidMessage: "",
                valid: true,
                nameRules: [
                    value => !!value || "Name is not defined"
                ],
                surnameRules: [
                    value => !!value && !!value.trim().length|| "Surname is not defined"
                ],
                phoneRules: [
                    value => !!value && !!value.trim().length || "Phone Number is not defined",
                    value => this.isValidPhoneNumber === true || this.invalidMessage
                ]
            }
        },
        methods: {
            validateForm() {
                return this.$refs.form.validate();
            },
            addContact() {
                if (!this.validateForm()) {
                    this.snackbar = true;
                } else {
                    const contact = {
                        name: this.name,
                        surname: this.surname,
                        phoneNumber: this.phoneNumber
                    };

                    phoneBookService.addContact(contact).done(response => {
                        const message = response.message;
                        if (response.success === false) {
                            this.isValidPhoneNumber = false;
                            this.invalidMessage = message;

                            if (!this.validateForm()) {
                                this.snackbar = true;
                            }
                        } else {
                            this.name = "";
                            this.surname = "";
                            this.phoneNumber = "";
                            this.$parent.loadContacts();
                            this.isValidPhoneNumber = true;
                        }
                    });
                }
            }
        }
    }
</script>


<style lang="scss">
    .input-form-wrapper {
        box-shadow: 0 0 20px rgba(0, 0, 50, 0.5);
    }
</style>