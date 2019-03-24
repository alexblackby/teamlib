const validationHandler = require('../middleware/validationHandler');
const verifyValidator = require('../validators/verifyValidator');
const loadBookspace = require('../middleware/loadBookspace');
const generateToken = require('../services/generateToken');
const responseAuthData = require('../services/responseAuthData');

const verify = (config) => [
    verifyValidator(config),
    validationHandler,
    loadBookspace,
    (req, res, next) => {
        const {currentUser: user, currentBookspace: bookspace} = req;
        user.email_verification = {
            is_verified: true,
            code: '',
        };
        user.save()
            .then(user => {
                generateToken(user, config)
                    .then(token => responseAuthData(res, {user, bookspace, token}));
            })
            .catch(err => next(err));
    }
];

module.exports = verify;