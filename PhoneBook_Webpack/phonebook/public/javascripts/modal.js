export var modalTemplate = {
    template: '#modal-template',
    methods: {
        deleteContact() {
            this.$emit("delete-contact");
        }
    }
};