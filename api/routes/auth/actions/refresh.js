const checkUserIsActive = require('../middleware/checkUserIsActive');
const checkEmailIsVerified = require('../middleware/checkEmailIsVerified');
const loadBookspace = require('../middleware/loadBookspace');
const {responseAuthData} = require('../services/auth');

const refresh = (config) => [
    checkUserIsActive,
    checkEmailIsVerified,
    loadBookspace,
    (req, res, next) => {
        const user = req.currentUser;
        return responseAuthData(res, user, config);
    }
];

module.exports = refresh;