const {createUser, findBookspace, generatePasswordHash} = require('../services/auth');
const validationHandler = require('../middleware/validationHandler');
const signupValidator = require('../validators/signupValidator');
const sendVerificationMail = require('../services/sendVerificationMail');

const signup = (config) => [
    signupValidator(config),
    validationHandler,
    async (req, res, next) => {
        const {email, password, name, subdomain, invite} = req.body;
        try {
            const passwordHash = await generatePasswordHash(password);
            const bookspace = await findBookspace(subdomain, invite);
            const user = await createUser({name, email, passwordHash, bookspace});
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

module.exports = signup;