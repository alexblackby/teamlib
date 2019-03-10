const errorFactory = require('http-errors');
const {validationResult} = require('express-validator/check');

function transformValidationErrors(validationErrors) {
    const transformed = {};
    validationErrors.map( error => {
        if (!transformed[error.param]) {
            transformed[error.param] = error.msg;
        }
    });
    return transformed;
}

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorFactory(422, new Error('Validation failed'), {
            errorType: 'validation.failed',
            data: transformValidationErrors(errors.array())
        }));
    }
    next();
};