const nodemailer = require('nodemailer');

// configure SMTP server
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// configure "from" headers
const originalSendMail = transporter.sendMail.bind(transporter);
transporter.sendMail = (data, callback) => {
    if (!data.from) {
        data.from = process.env.MAIL_FROM;
    }
    return originalSendMail(data, callback);
};

module.exports = transporter;