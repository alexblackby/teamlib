const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body, check} = require('express-validator/check');

module.exports = (config) => {
    const {userModel} = config;
    return [
        check('userid').exists(),
        check('code').exists(),
        body('userid').custom((value, {req}) => {
            const objectId = mongoose.Types.ObjectId(value);
            return userModel.findOne({_id: objectId})
                .then(user => {
                    const codeValid = Boolean(user && user.email_verification.code === req.body.code);
                    const alreadyVerified = Boolean(user && user.email_verification.is_verified);
                    if (codeValid) {
                        req.verifyUser = user;
                        return Promise.resolve();
                    }
                    if (alreadyVerified) {
                        return Promise.reject('Your account is already verified. You can login to it.');
                    }
                    return Promise.reject('This link is not valid verification link.');
                });
        }),
    ];
};