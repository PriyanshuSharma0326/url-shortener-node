const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({ });
    res.status(200).render('home', { urls: allUrls });
});

module.exports = router;
