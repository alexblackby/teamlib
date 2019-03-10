const mongoose = require('mongoose');
const errorFactory = require('http-errors');
const Bookspace = require('../../models/bookspace');
const validationHandler = require('../../middleware/validationHandler');
const createValidator = require('./validators/create');


exports.post = [
    createValidator,
    validationHandler,
    (req, res, next) => {
        const {url, name} = req.body;

        let newItem = new Bookspace({
            name,
            url,
            lang: 'en',
            signup_policy: {
                policy_type: 'by_domain',
                domain: 'test.com'
            },
            book_policy: {
                policy_type: 'many_to_many'
            }
        });

        newItem.save(err => {
            if (err) {
                next(err);
            }
            else {
                res.json({ success: true });
            }
        });
    }
];