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
    export default {
        // name: "Form"
    }
</script>

<style scoped>

</style>