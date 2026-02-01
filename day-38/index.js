const express = require('express');
const app=express();
const mongoose = require('mongoose');

app.get("/",(req,res)=>{
    res.send("Root is Running");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})