const express = require('express');
const createAuth = require('./auth');
const authConfig = require('../config/auth');
const errorFactory = require('http-errors');

const router = express.Router();

const auth = createAuth(authConfig);
router.use('/auth', auth.router);

router.use('/bookspaces', require('./bookspaces'));

router.use('/api', auth.check, require('./api'));

router.use(function (req, res, next) {
    const error = errorFactory.NotFound(`Page ${req.originalUrl} was not found.`);
    return next(error);
});


module.exports = router;