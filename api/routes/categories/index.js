const express = require('express');
const actions = require('./actions.js');

const router = express.Router();

router.get('/', actions.list);
router.get('/:id', actions.show);
router.post('/', actions.post);
router.put('/:id', actions.put);
router.delete('/:id', actions.delete);

module.exports = router;