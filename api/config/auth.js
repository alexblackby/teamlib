const userModel = require('../models/user');
const mailTransporter = require('./mailer');

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
};

module.exports = authConfig;