const {body, check} = require('express-validator/check');

module.exports = (config) => {
    const {userModel} = config;
    return [
        check('email')
            .exists().withMessage('Enter your e-mail.')
            .isEmail().withMessage('Invalid e-mail format.'),
        check('name')
            .exists().withMessage('Enter your full name.')
            .matches(/[\p{L}.'-]+ [\p{L} .'-]+/u).withMessage('Enter your first and last name.')
            .isLength({min: 5}).withMessage('Username should be minimum 5 characters long.')
            .isLength({max: 30}).withMessage('Username should be no longer than 30 characters.'),
        check('password')
            .isLength({min: 5, max: 50}).withMessage('Password should be minimum 5 characters long.'),
        body('email').custom(value => {
            return userModel.findOne({email: value})
                .then(user => {
                    if (user) {
                        return Promise.reject('This e-mail is already in use. If it is your account you should log in.');
                    } else {
                        return Promise.resolve();
                    }
                });
        }),
    ];
};