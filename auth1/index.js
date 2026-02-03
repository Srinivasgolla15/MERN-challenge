const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');


const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/user');

const app = express();

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/AuthDB');
    console.log("Connected to MongoDB");
}
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(staticRoutes);
app.use( userRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
