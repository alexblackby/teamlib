const { body, check } = require('express-validator/check');
const bookspace = require('../../../models/bookspace');

module.exports = [
    check('url')
        .exists().withMessage('Enter URL')
        .isAlphanumeric()
        .isLength({min:3}).withMessage('URL should be minimum 3 characters long')
        .isLength({max:20}).withMessage('URL should be no longer than 20 characters')
    ,
    check('name')
        .exists().withMessage('Enter Name')
        .matches(/^[a-zA-Zа-яА-Я0-9 ]+$/).withMessage('Only letters, digits and spaces allowed')
    ,
    body('url').custom(value => {
        if (!value) return Promise.resolve();
        return bookspace.findOne({url: value})
            .then(item => {
                if (item) {
                    return Promise.reject('This URL is taken. Choose another.');
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }),
];
