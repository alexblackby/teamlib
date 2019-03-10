const validationHandler = require('../middleware/validationHandler');
const verifyValidator = require('../validators/verifyValidator');

const verify = (config) => [
    verifyValidator(config),
    validationHandler,
    (req, res, next) => {
        const user = req.verifyUser;
        user.email_verification = {
            is_verified: true,
            code: '',
        };
        user.save(function (err, user) {
            if (err) return next(new Error(err));
            res.json({success: true});
        });
    }
];

module.exports = verify;