const errorFactory = require('http-errors');

module.exports = function (error, req, res, next) {
    return next(new errorFactory.BadRequest('Request body parse error: ' + error.message));
};