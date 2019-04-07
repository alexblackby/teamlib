const validationHandler = require('../middleware/validationHandler');
const checkUserIsActive = require('../middleware/checkUserIsActive');
const checkEmailIsVerified = require('../middleware/checkEmailIsVerified');
const loginValidator = require('../validators/loginValidator');
const loadBookspace = require('../middleware/loadBookspace');
const {responseAuthData, findBookspace} = require('../services/auth');

const login = (config) => [
    loginValidator(config),
    validationHandler,
    checkUserIsActive,
    checkEmailIsVerified,
    loadBookspace,
    async (req, res, next) => {
        const {currentUser: user, body: {invite, subdomain}} = req;
        let bookspace = req.currentBookspace;
        try {
            if (invite && !bookspace) {
                // if user uses invite link after he was registred - we save bookspace from invite to user's profile
                bookspace = await findBookspace(subdomain, invite);
                if (bookspace) {
                    user.bookspace_id = bookspace._id;
                    await user.save();
                }
            }
            return responseAuthData(res, user, config);
        } catch (err) {
            next(err);
        }
    }
];

module.exports = login;