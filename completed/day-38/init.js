const mongoose = require('mongoose');
const Chat = require('./chat.js');

main().then(() => console.log("Connected to MongoDB")).
    catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

Chat.insertMany([
    {
        from: "alpha",
        to: "Bobby",
        msg: "Hello Bobby! This is Alpha.",
        created_at: new Date(),
    },
    {
        from: "Charlie",
        to: "Delta",
        msg: "Hey Delta! Charlie here.",
        created_at: new Date(),
    },
    {
        from: "Echo",
        to: "Foxtrot",
        msg: "Hi Foxtrot! Echo speaking.",
        created_at: new Date(),
    },
    {
        from: "Golf",
        to: "Hotel",
        msg: "Hello Hotel! This is Golf.",
        created_at: new Date(),
    }
])