var express = require('express');
var router = express.Router();

// Get Home page
router.get('/', function (req, res) {
    res.render('index', {title: 'Phone Book'});
});

module.exports = router;

var contacts = [];
var id = 1;

router.get('/getContacts', function (req, res) {
    var search = (req.query.search || '').toUpperCase(); // get parameter from url, if no search --> empty string
    var filteredContacts =
        search === ""
            ? contacts
            : contacts.filter(function (contact) {
                return contact.name.toUpperCase().indexOf(search) !== -1 ||
                    contact.surname.toUpperCase().indexOf(search) !== -1 ||
                    contact.phoneNumber.toUpperCase().indexOf(search) !== -1
            });
    res.send(filteredContacts);
});

router.post('/deleteContact', function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send(contacts);
});

router.post('/deleteAll', function (req, res) {
    var id = req.body.contact;

    contacts = contacts.filter(function (c) {
        return id.indexOf(c.id) === -1;
    });

    res.send(contacts);
});

router.post('/addContact', function (req, res) {
    var contact = req.body.contact;
    contact.id = id;
    ++id;

    var success = true;
    var message = "";

    // validation for numeric phone number
    var regExpPhoneSymbols = /^[\d\s()+-]*$/;
    if (!regExpPhoneSymbols.test(contact.phoneNumber)) {
        success = false;
        message = "permits numbers only";
    }

    // validation for unique phone number
    contacts.forEach(function (c) {
        if (contact.phoneNumber === c.phoneNumber) {
            success = false;
            message = "is already added";
        }
    });

    if (success === false) {
        res.send({
            success: false,
            message: message
        });
    } else {
        contacts.push(contact);
        res.send({
            success: true,
            message: "Contact is added"
        });
    }
});