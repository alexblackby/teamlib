const bcrypt = require('bcryptjs');
const {body, check} = require('express-validator/check');

module.exports = (config) => {
    const {userModel} = config;
    return [
        check('email')
            .exists().withMessage('Enter e-mail'),
        check('password')
            .exists().withMessage('Enter password'),
        body('email').custom((value, {req}) => {
            return userModel
                .findOne({email: value})
                .select('+password')
                .then(user => {
                    if (!user) {
                        return Promise.reject('User with given login was not found');
                    }
                    return bcrypt.compare(req.body.password, user.password).then((res) => {
                        if (!res) {
                            return Promise.reject('Password is incorrect');
                        }
                        req.loginUser = user;
                        return Promise.resolve();
                    });
                })
        }),
    ];
};