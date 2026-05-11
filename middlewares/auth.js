const { getUser } = require("../services/auth");

async function strictLogin(req, res, next) {
    const uid = req.cookies?.uid;

    if (!uid) return res.redirect("/login");

    const user = getUser(uid);

    if (!user) return res.redirect("/login");

    req.user = user;

    next();
}

async function checkAuthenticated(req, res, next) {
    const uid = req.cookies?.uid;
    const user = getUser(uid);
    req.user = user;
    next();
}

module.exports = {
    strictLogin,
    checkAuthenticated
};
