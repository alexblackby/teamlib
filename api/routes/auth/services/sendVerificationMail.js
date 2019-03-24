const fs = require('fs');
const handlebars = require('handlebars');

const sendVerificationMail = (mailConfig) => async ({user, bookspace}) => {
    return new Promise((resolve, reject) => {
        const verify_url = mailConfig.verifyURL
            .replace('%userid%', user._id)
            .replace('%code%', user.email_verification.code);
        fs.readFile(__dirname + '/../views/verify.hbs.html', 'utf8', (err, source) => {
            if (err) return reject(err);
            const template = handlebars.compile(source);
            const html = template({verify_url});
            const mailOptions = {
                to: user.name + '<' + user.email + '>',
                subject: "Complete your registration",
                html
            };
            mailConfig.transporter.sendMail(mailOptions, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

module.exports = sendVerificationMail;