const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validationHandler = require('../middleware/validationHandler');
const signupValidator = require('../validators/signupValidator');
const sendVerificationMail = require('../services/sendVerificationMail');
const Bookspace = require('../../../models/bookspace');
const User = require('../../../models/user');

const signup = (config) => [
    signupValidator(config),
    validationHandler,
    async (req, res, next) => {
        const {email, password, name, subdomain} = req.body;
        try {
            const passwordHash = await generatePasswordHash(password);
            const bookspace = await findBookspace(subdomain);
            const user = await saveUser({name, email, passwordHash, bookspace});
            await sendVerificationMail(config.mail)({user, bookspace});
            res.json({
                success: true,
                data: {user: user.getDataForAPI()}
            });
        } catch (err) {
            next(err);
        }
    }
];

const generatePasswordHash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, function (err, passwordHash) {
            return err ? reject(err) : resolve(passwordHash);
        });
    });
};

const findBookspace = async (subdomain) => {
    return Bookspace.findOne({subdomain});
};

const saveUser = async ({name, email, passwordHash, bookspace}) => {
    const user = new User({
        email,
        password: passwordHash,
        name,
        bookspace_id: bookspace ? bookspace._id : null,
        email_verification: {
            is_verified: false,
            code: crypto.randomBytes(4).toString('hex'),
        },
    });
    return user.save();
};

module.exports = signup;