export var modalTemplate = {
    template: '#modal-template',
    methods: {
        deleteContact: function () {
            this.$emit("delete-contact");
        }
    }
};