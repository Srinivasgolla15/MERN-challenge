const express = require('express');
const app=express();
const mongoose = require('mongoose');


main().then(() => console.log("Connected to MongoDB")).
catch(err=>console.log(err));
async function main() {
    await mongoose.connect('mondodb://127.0.0.1:27017/Whatsapp');
}

app.get("/",(req,res)=>{
    res.send("Root is Running");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})