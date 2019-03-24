const express = require('express');
const createCheckJWT = require('./middleware/checkJWT');
const signup = require('./actions/signup');
const login = require('./actions/login');
const verify = require('./actions/verify');
const refresh = require('./actions/refresh');

const createAuth = (config) => {
    const check = createCheckJWT(config);
    const router = express.Router();

    router.post('/signup', signup(config));
    router.post('/login', login(config));
    router.post('/verify', verify(config));
    router.get('/refresh', check, refresh(config));

    return {router, check};
};

module.exports = createAuth;