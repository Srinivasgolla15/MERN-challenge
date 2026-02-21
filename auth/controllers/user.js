const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken, verifyToken } = require('../service/auth');

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

    const token = generateToken(user);

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    console.log("LOGIN USER:", user);

    console.log("GENERATED TOKEN:", token);

    res.redirect('/');
}

async function handleUserLogout(req, res) {
    res.clearCookie("token");
    res.redirect('/login');
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
};


