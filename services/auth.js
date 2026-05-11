const jwt = require('jsonwebtoken');

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        ...user
    }, process.env.NODE_SECRET);
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.NODE_SECRET);
    }
    catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}
