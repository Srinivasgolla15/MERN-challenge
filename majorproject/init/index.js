const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const { init } = require("../models/user");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust')
    console.log (" connected to db");
}
main().catch(err => console.log(err));

const initDb = async () => {
    await Listing.deleteMany({});
    
    // Only two user IDs to distribute equally across listings
    const userIds = [
        "69a01fddad5037dfbde0f834",
        "699deabe675bb02f952a335c"
    ];
    
    initData.data = initData.data.map((obj, index) => {
        // Alternate between the two user IDs for equal distribution
        const userIndex = index % 2; // This will alternate 0, 1, 0, 1, ...
        return {...obj, owner: userIds[userIndex]};
    });
    
    await Listing.insertMany(initData.data);
    console.log("data is initialized with two users equally distributed");
}

initDb();
