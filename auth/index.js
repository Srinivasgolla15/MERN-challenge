const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const userRoutes = require('./routes/user');
const path = require('path');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/AuthDB');
    console.log("Connected to MongoDB");
}

main().catch(err=>console.log(err));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});