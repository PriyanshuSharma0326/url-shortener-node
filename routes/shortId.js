const express = require('express');
const { handleShortIdRoute } = require('../controllers/shortId');

const router = express.Router();

router.get('/:shortId', handleShortIdRoute);

module.exports = router;
