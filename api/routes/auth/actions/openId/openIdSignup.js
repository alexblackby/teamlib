const crypto = require('crypto');
const {createUser, findBookspace, generatePasswordHash} = require("../../services/auth");
const loadInfoFromOpenIdToken = require('../../middleware/loadInfoFromOpenIdToken');
const {responseAuthData} = require("../../services/auth");

const openIdSignup = (config) => [
    loadInfoFromOpenIdToken(config),
    async (req, res, next) => {
        const {email, name, subdomain, invite} = req.body;
        try {
            const existingUser = await config.userModel.findOne({email});
            if (existingUser) {
                if (!existingUser.is_active) {
                    next(new Error('User was deactivated'));
                }
                if (!existingUser.email_verification.is_verified) {
                    existingUser.email_verification.is_verified = true;
                    await existingUser.save();
                }
                return responseAuthData(res, existingUser, config);
            }

            const password = crypto.randomBytes(4).toString('hex');
            const passwordHash = await generatePasswordHash(password);
            const bookspace = await findBookspace(subdomain, invite);
            const newUser = await createUser({name, email, passwordHash, bookspace, is_verified: true});
            return responseAuthData(res, newUser, config);
        } catch (err) {
            next(err);
        }
    }
];

module.exports = openIdSignup;