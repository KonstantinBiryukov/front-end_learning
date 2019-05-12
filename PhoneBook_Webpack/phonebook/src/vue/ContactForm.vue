<template>
    <div id="add-contact-form" class="col-xl-4 col-md-4 main-interface-wrapper needs-validation">
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
</template>

<script>
    import phoneBookService from "../javascripts/phoneBookService";

    export default {
        data() {
            return {
                name: "",
                surname: "",
                phoneNumber: "",
                isValidName: true,
                isValidSurname: true,
                isValidPhoneNumber: true,
                invalidMessage: ""
            }
        },
        methods: {
            addContact() {
                const request = {
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

                phoneBookService.addContact(request.contact).done(response => {
                    const message = response.message;
                    if (response.success === false) {
                        this.isValidPhoneNumber = false;
                        this.invalidMessage = message;
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
</script>

<style lang="scss">
    $dark-blue-border: 2px dashed darkblue;
    $dark-red-border: 2px dashed darkred;

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

    .invalid-form {
        border: $dark-red-border;
        box-shadow: 0 0 20px rgba(250, 0, 0, 0.5);
    }

    .message-invalid {
        background-color: rgba(200, 0, 0, 0.5);
        border-bottom: $dark-red-border;
    }
</style>