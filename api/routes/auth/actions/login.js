const validationHandler = require('../middleware/validationHandler');
const checkUserIsActive = require('../middleware/checkUserIsActive');
const checkEmailIsVerified = require('../middleware/checkEmailIsVerified');
const loginValidator = require('../validators/loginValidator');
const loadBookspace = require('../middleware/loadBookspace');
const generateToken = require('../services/generateToken');
const responseAuthData = require('../services/responseAuthData');

const login = (config) => [
    loginValidator(config),
    validationHandler,
    checkUserIsActive,
    checkEmailIsVerified,
    loadBookspace,
    async (req, res, next) => {
        const {currentUser: user, currentBookspace: bookspace} = req;
        try {
            const token = await generateToken(user, config);
            responseAuthData(res, {user, bookspace, token});
        } catch (err) {
            next(err);
        }
    }
];

module.exports = login;