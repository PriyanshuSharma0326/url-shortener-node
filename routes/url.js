const express = require('express');
const { handleGenerateShortId, handleGetAnalytics, handleDeleteEntry } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateShortId);

router.get('/analytics/:shortId', handleGetAnalytics);

router.delete('/:id', handleDeleteEntry);

module.exports = router;
