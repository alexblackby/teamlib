const {body, check} = require('express-validator/check');
const bookspace = require('../../../models/bookspace');

module.exports = [
    check('name')
        .matches(/^[a-zA-Zа-яА-Я0-9 ]+$/).withMessage('Only letters, digits and spaces are allowed for Name')
        .optional(),
    check('show_onboarding')
        .isBoolean()
        .optional(),
];
