const express = require('express');
const createCheckJWT = require('./middleware/checkJWT');
const signup = require('./actions/signup');
const login = require('./actions/login');
const verify = require('./actions/emailVerification/verify');
const refresh = require('./actions/refresh');
const checkInvite = require('./actions/invites/checkInvite');
const applyInvite = require('./actions/invites/applyInvite');
const openIdUrl = require('./actions/openId/openIdUrl');
const openIdSignup = require('./actions/openId/openIdSignup');

const createAuth = (config) => {
    const checkAuth = createCheckJWT(config);
    const router = express.Router();

    router.post('/signup', signup(config));
    router.post('/login', login(config));
    router.post('/verify', verify(config));
    router.get('/refresh', checkAuth, refresh(config));

    router.get('/:subdomain/invites/:code', checkInvite);
    router.put('/:subdomain/invites/:code', checkAuth, applyInvite);


    router.get('/openid/:provider/url', openIdUrl(config));
    router.post('/openid/:provider/signup', openIdSignup(config));

    return {router, check: checkAuth};
};

module.exports = createAuth;