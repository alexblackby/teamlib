const {responseAuthData} = require('../../services/auth');
const validationHandler = require('../../middleware/validationHandler');
const verifyValidator = require('../../validators/verifyValidator');
const loadBookspace = require('../../middleware/loadBookspace');

const verify = (config) => [
    verifyValidator(config),
    validationHandler,
    loadBookspace,
    async (req, res, next) => {
        const {currentUser: user} = req;
        try {
            user.email_verification = {
                is_verified: true,
                code: '',
            };
            await user.save();
            return responseAuthData(res, user, config);
        } catch (err) {
            next(err);
        }
    }
];

module.exports = verify;