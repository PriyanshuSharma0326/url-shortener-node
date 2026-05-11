const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateShortId(req, res) {
    const body = req.body;

    const allUrls = await URL.find({});

    if(!body.url) {
        return res.status(404).render('home', { id: null, urls: allUrls, });
    }

    const id = nanoid(8);

    await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    const updatedUrls = await URL.find({});

    return res.status(201).render('home', { id: id, urls: updatedUrls });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId: shortId });

    if(!result) {
        res.status(404).json({ message: "No url found." });
    }

    res.status(200).json({
        message: "Found url analytics.",
        data: {
            clicks: result.visitHistory.length,
        }
    });
}

async function handleDeleteEntry(req, res) {
    await URL.findByIdAndDelete(req.params.id);
    return res.redirect("/");
}

module.exports = {
    handleGenerateShortId,
    handleGetAnalytics,
    handleDeleteEntry,
}
