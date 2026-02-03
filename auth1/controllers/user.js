const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { setUser, deleteUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.redirect('/login');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user._id);

    res.cookie('uid', sessionId, { httpOnly: true });
    res.redirect('/');
}

async function handleUserLogout(req, res) {
    const sessionId = req.cookies.uid;
    if (sessionId) {
        deleteUser(sessionId);
        res.clearCookie('uid');
    }

    
    res.redirect('/login');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};
