const {body, check} = require('express-validator/check');
const bookspace = require('../../../models/bookspace');

const reservedSubdomains = ['app', 'admin', 'api', 'www', 'info', 'webmaster', 'payment', 'demo', 'test', 'blog',
    'news', 'ads', 'auth', 'billing', 'dev', 'ftp', 'gateway', 'static', 'img', 'mail', 'partner', 'partners'];

module.exports = [
    check('subdomain')
        .exists().withMessage('Choose Name and URL')
        .isAlphanumeric()
        .isLength({min: 3}).withMessage('URL should be minimum 3 characters long')
        .isLength({max: 20}).withMessage('URL should be no longer than 20 characters'),
    check('name')
        .exists().withMessage('Enter Name')
        .matches(/^[a-zA-Zа-яА-Я0-9 ]+$/).withMessage('Only letters, digits and spaces are allowed for Name'),
    body('subdomain').custom(value => {
        if (!value) return Promise.resolve();
        if (reservedSubdomains.includes(value)) {
            return Promise.reject('This Name or URL is reserved. Choose another.');
        }
        return bookspace.findOne({subdomain: value})
            .then(item => {
                if (item) {
                    return Promise.reject('This Name or URL is taken. Choose another.');
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }),
];
