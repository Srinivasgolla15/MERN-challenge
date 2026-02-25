const mongoose = require("mongoose");
const initData = require("./data");
const {Listing}= require("../models/listing");
const { init } = require("../models/user");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
    console.log ( " connected to db");
}
main().catch(err => console.log(err));

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"699deabe675bb02f952a335c"}))
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
}

initDb()
