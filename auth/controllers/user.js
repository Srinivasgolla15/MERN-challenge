const User = require('../models/user');
const { setUser, deleteUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    let { name, email, password } = req.body;
    try {
        let user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function handleUserLogin(req, res) {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        
        if (isPasswordValid) {
            const sessionId = setUser(user);
            res.cookie('uid', sessionId);
            return res.status(200).redirect('/');
        } else {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

async function handleUserLogout(req, res) {
    const userUid = req.cookies.uid;
    if (userUid) {
        deleteUser(userUid);
        res.clearCookie('uid');
    }
    return res.redirect('/login');
}

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };