const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    res.status(200).render('home', { urls: allUrls });
});

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({});
    res.status(200).render('home', { urls: allUrls });
});

router.get('/signup', (req, res) => {
    return res.status(200).render('signup');
});

router.get('/login', (req, res) => {
    return res.status(200).render('login');
});

module.exports = router;
