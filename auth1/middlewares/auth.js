const { getUser } = require('../service/auth');
const User = require('../models/user');

async function checkAuth(req, res, next) {
    const sessionId = req.cookies.uid;
    if (!sessionId) {
        return res.redirect('/login');
    }

    const userId = getUser(sessionId);
    if (!userId) {
        return res.redirect('/login');
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

module.exports = {checkAuth};
