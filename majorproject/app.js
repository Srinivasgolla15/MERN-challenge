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
//index route
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/listings.ejs",{allListings});
})
//new listing
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})
//post create route
app.post("/listings",async(req,res)=>{
    let listing = req.body.listing;
    await Listing.create(listing);
    res.redirect("/listings");


})
//show Route
app.get("/listings/:id",async (req,res) =>{
    let {id} =req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs",{listing})
})



//server
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})