const {
    notEmpty, isEmail, validate
} = require('core');

const rule = {
    password: [[notEmpty, 'Password should not be empty.']],
    email: [
        [notEmpty, 'Email should not be empty'],
        [isEmail, 'Email should be valid']
    ]
};

module.exports.validate = async data => validate(rule, data);