const express = require('express');
const actions = require('./actions.js');

const router = express.Router();

router.post('/', actions.post);
router.put('/:id', actions.update);

module.exports = router;