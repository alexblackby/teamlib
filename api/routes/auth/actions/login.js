const jsonwebtoken = require('jsonwebtoken');
const validationHandler = require('../middleware/validationHandler');
const checkUserIsActive = require('../middleware/checkUserIsActive');
const checkEmailIsVerified = require('../middleware/checkEmailIsVerified');
const loginValidator = require('../validators/loginValidator');


const login = (config) => [
    loginValidator(config),
    validationHandler,
    checkUserIsActive,
    checkEmailIsVerified,
    (req, res, next) => {
        const user = req.loginUser;
        const payload = {
            userId: user._id,
            exp: Math.floor(Date.now() / 1000) + (config.jwt.expires * 60),
        };
        jsonwebtoken.sign(payload, config.jwt.secret, function (err, token) {
            if (err) return next(err);
            res.json({
                success: true,
                data: {token, user: user.getDataForAPI()}
            });
        });
    }
];

module.exports = login;