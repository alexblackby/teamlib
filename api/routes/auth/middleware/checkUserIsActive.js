const errorFactory = require('http-errors');

const checkUserIsActive = (req, res, next) => {
    const user = req.currentUser;
    if (user.is_active === false) {
        const error = new errorFactory.Forbidden('User profile was deactivated');
        next(error);
    } else {
        next();
    }
};

module.exports = checkUserIsActive;