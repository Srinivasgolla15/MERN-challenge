const User = require('../models/user');
const {v4: uuidv4} = require('uuid');

async function handleUserSignup(req,res){
    let {name, email, password} = req.body;
    try {
        let user = new User({name, email, password});
        await user.save();
        res.status(201).send({message: 'User created successfully'});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

async function handleUserLogin(req,res){
    let {email, password} = req.body;
    const user = await User.findOne({email});
    try{
        if(user && user.password === password){
            res.status(200).send({message: 'Login successful'});
        } else {
            res.status(401).send({message: 'Invalid email or password'});
        }
    }catch(err){
        res.send({error: err.message});
    }
    res.render('home');
}

module.exports = { handleUserSignup,handleUserLogin };