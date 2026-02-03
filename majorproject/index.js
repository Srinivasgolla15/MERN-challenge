const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const {Listing} = require("./models/listing");



const app = express();

//DB COnnection
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
    console.log ( " connected to db")
}
main().catch(err => console.log(err));

//middlewares
app.use(express.urlencoded({ extended: true }));        
app.use(methodOverride('_method'));

//views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.get("/",(req,res)=>{
    res.send("welcome")
})

app.get("/testlistings",async(req,res)=>{
    let samplelisting = new Listing({
        title: "my new home",
        description: "by the beach",
        price:1200,
        location:"calangute , Goa",
        country:"India",
    })

    await samplelisting.save();
    res.send("testing success")
})

//server
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})