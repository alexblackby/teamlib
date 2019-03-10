const errorFactory = require('http-errors');

const checkEmailIsVerified = (req, res, next) => {
    const user = req.loginUser;
    if (user.email_verification.is_verified === false) {
        const error = errorFactory(403, new Error('E-mail is not verified'), {errorType: 'email.not.verified'});
        return next(error);
    } else {
        return next();
    }
};

module.exports = checkEmailIsVerified;