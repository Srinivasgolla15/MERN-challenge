const http = require("http");
const express =require("express");
const path = require("path");
const  {Server} = require("socket.io");


const app = express();
 
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("A new user has connected ",socket.io)
})


app.use(express.static(path.join("./public")));


app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})

app.listen(3000,(req,res)=>{
    console.log("server is running at 3000");
})