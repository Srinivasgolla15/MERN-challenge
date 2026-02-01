const express = require('express');
const app=express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./chat.js');
 
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

main().then(() => console.log("Connected to MongoDB")).
catch(err=>console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}

// let Chat1 = new Chat({
//     from: "Alice",
//     to: "Bob",
//     msg: "Hello Bob! This is Alice.",
//     created_at: new Date(),
// });

// Chat1.save().then(() => console.log("Chat saved")).catch(err => console.log(err));

app.get("/",(req,res)=>{
    res.send("Root is Running");
})

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render('chats.ejs',{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render('new.ejs');
});

app.post("/chats",async (req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})