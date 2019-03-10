const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validationHandler = require('../middleware/validationHandler');
const signupValidator = require('../validators/signupValidator');
const sendVerificationMail = require('../services/sendVerificationMail');

const signup = (config) => [
    signupValidator(config),
    validationHandler,
    (req, res, next) => {
        let {email, password, name} = req.body;

        bcrypt.hash(password, 8, function (err, passwordHash) {
            if (err) return next(err);

            const user = new config.userModel({
                email,
                password: passwordHash,
                name,
                email_verification: {
                  is_verified: false,
                  code: crypto.randomBytes(4).toString('hex'),
                },
            });

            user.save(function (err, user) {
                if (err) return next(err);
                sendVerificationMail(config.mail, user, (err) => {
                    if (err) return next(err);
                    res.json({
                        success: true,
                        data: {user: user.getDataForAPI()}
                    });
                });
            });
        });
    }
];

module.exports = signup;