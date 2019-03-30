const express = require('express');
const createCheckJWT = require('./middleware/checkJWT');
const signup = require('./actions/signup');
const login = require('./actions/login');
const verify = require('./actions/verify');
const refresh = require('./actions/refresh');
const checkInvite = require('./actions/checkInvite');
const applyInvite = require('./actions/applyInvite');

const createAuth = (config) => {
    const checkAuth = createCheckJWT(config);
    const router = express.Router();

    router.post('/signup', signup(config));
    router.post('/login', login(config));
    router.post('/verify', verify(config));
    router.get('/refresh', checkAuth, refresh(config));
    router.get('/:subdomain/invites/:code', checkInvite);
    router.put('/:subdomain/invites/:code', checkAuth, applyInvite);

    return {router, check: checkAuth};
};

module.exports = createAuth;