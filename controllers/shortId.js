const URL = require("../models/url");

async function handleShortIdRoute(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        {
            $push: {
                visitHistory: {}
            }
        }
    );

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    res.redirect(entry.redirectUrl);
}

module.exports = {
    handleShortIdRoute
};
