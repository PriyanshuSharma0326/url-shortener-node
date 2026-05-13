const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const uid = req?.cookies?.uid;

    if (!uid) {
        req.user = null;
        return next();
    }

    const user = getUser(uid);

    if(!user) {
        req.user = null;
        return next();
    }

    req.user = user;
    next();
}

function restrictTo(roles) {
    return (
        function(req, res, next) {
            if(!req.user) return res.redirect('/login');

            if(!roles.includes(req.user._doc.role)) return res.end("Unauthorized");

            next();
        }
    )
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};
