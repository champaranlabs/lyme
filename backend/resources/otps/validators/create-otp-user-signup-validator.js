const {
    notEmpty, numeric, isEmail, isMobileNumber, validate
} = require('core');


const rule = {
    name: [
        [notEmpty, 'Name should not be empty']
    ],
    email: [
        [notEmpty, 'Email should not be empty'],
        [isEmail, 'Email should be valid']
    ],
    password: [
        [notEmpty, 'Password should not be empty']
    ]
};

module.exports.validate = async data => validate(rule, data);
