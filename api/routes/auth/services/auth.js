const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Bookspace = require('../../../models/bookspace');
const User = require('../../../models/user');


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


const responseAuthData = async (res, user, config) => {
    const token = await generateToken(user, config);
    const bookspace = await user.getBookspace();
    const data = {
        user: user.getDataForAPI(),
        bookspace,
        token,
    };
    res.json({
        success: true,
        data
    });
};

const generatePasswordHash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, function (err, passwordHash) {
            return err ? reject(err) : resolve(passwordHash);
        });
    });
};

const findBookspace = async (subdomain, code) => {
    return Bookspace.findOne({subdomain, invite_codes: code});
};

const createUser = async ({name, email, passwordHash, bookspace, is_verified}) => {
    const verification_if_verified = {
        is_verified: true,
        code: '',
    };
    const verification_if_not_verified = {
        is_verified: false,
        code: crypto.randomBytes(4).toString('hex'),
    };
    const user = new User({
        email,
        password: passwordHash,
        name,
        bookspace_id: bookspace ? bookspace._id : null,
        email_verification: is_verified ? verification_if_verified : verification_if_not_verified,
    });
    return user.save();
};


module.exports = {
    generateToken,
    responseAuthData,
    generatePasswordHash,
    findBookspace,
    createUser,
};
