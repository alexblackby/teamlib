const express = require('express');

const router = express.Router();

router.use('/bookspaces', require('./bookspaces'));
router.use('/categories', require('./categories'));

module.exports = router;