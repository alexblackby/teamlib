const crypto = require('crypto');
const User = require('../../models/user');
const Bookspace = require('../../models/bookspace');
const validationHandler = require('../../middleware/validationHandler');
const createValidator = require('./validators/create');

const setUserBookspace = (user_id) => (bookspace) => {
    return User.findById(user_id)
        .then(user => {
            user.bookspace_id = bookspace._id;
            return user.save();
        })
        .then(user => {
            return {bookspace, user};
        });
};

exports.post = [
    createValidator,
    validationHandler,
    (req, res, next) => {
        const {subdomain, name} = req.body;
        const newItem = new Bookspace({
            name,
            subdomain,
            owner_id: req.currentUser._id,
            lang: 'en',
            invite_codes: [crypto.randomBytes(4).toString('hex')],
            show_onboarding: true,
        });
        newItem.save()
            .then(setUserBookspace(req.currentUser._id))
            .then(({bookspace, user}) => res.json({
                success: true,
                data: {
                    user: user.getDataForAPI(),
                    bookspace,
                }
            }))
            .catch(err => next(err));
    }
];