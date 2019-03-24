const jsonwebtoken = require('jsonwebtoken');

const generateToken = async (user, config) => {
    const payload = {
        user_id: user._id,
        bookspace_id: user.bookspace_id,
        exp: Math.floor(Date.now() / 1000) + (config.jwt.expires * 60),
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, config.jwt.secret, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = generateToken;