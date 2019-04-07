const mailTransporter = require('./mailer');
const userModel = require('../models/user');

const authConfig = {
    userModel,
    mail: {
        transporter: mailTransporter,
        verifyURL: process.env.HOST + '/verify/%userid%/%code%',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES_MINUTES,
    },
    openId: {
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: 'teamlib',
        providers: {},
    },
};

module.exports = authConfig;