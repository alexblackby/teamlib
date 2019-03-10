const express = require('express');
const actions = require('./actions.js');

const router = express.Router();

router.post('/', actions.post);

module.exports = router;