const jwt = require('jsonwebtoken');
const errorFactory = require('http-errors');

const createCheckJWT = (config) => (req, res, next) => {
    const {userModel} = config;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.match(/^Bearer .+/)) {
        const jwtString = authHeader.split(' ')[1];
        if (!jwtString) {
            return next(new errorFactory.Unauthorized('Provide valid authorization token'));
        }
        jwt.verify(jwtString, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return next(new errorFactory.Unauthorized(err.name + ': ' + err.message));
            } else {
                userModel.findOne({_id: data.user_id})
                    .then(user => {
                        if (!user) {
                            return next(new errorFactory.Unauthorized('User is not found'));
                        }
                        if (user.is_active === false) {
                            return next(new errorFactory.Unauthorized('User was deactivated'));
                        }
                        req.currentUser = user;
                        next();
                    })
                    .catch(err => next(err));
            }
        });
    } else {
        return next(new errorFactory.Unauthorized('Provide valid authorization token'));
    }
};

module.exports = createCheckJWT;