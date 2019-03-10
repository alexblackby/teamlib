const fs = require('fs');
const handlebars = require('handlebars');


const sendVerificationMail = (mailConfig, user, callback) => {

    const verify_url = mailConfig.verifyURL
        .replace('%userid%', user._id)
        .replace('%code%', user.email_verification.code);

    fs.readFile(__dirname + '/../views/verify.hbs.html', 'utf8', (err, source) => {
        if (err) return callback(err);
        const template = handlebars.compile(source);
        const html = template({verify_url});
        const mailOptions = {
            to: user.name + '<' + user.email + '>',
            subject: "Complete your registration",
            html
        };
        mailConfig.transporter.sendMail(mailOptions, callback);
    });

};

module.exports = sendVerificationMail;