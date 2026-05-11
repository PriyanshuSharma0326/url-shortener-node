const URL = require("../models/url");

// This function redirects the user to redirectUrl page
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
        return res.redirect('/');
    }

    res.redirect(entry.redirectUrl);
}

module.exports = {
    handleShortIdRoute
};
