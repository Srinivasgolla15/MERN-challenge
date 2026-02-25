const http = require("http");
const express =require("express");
const path = require("path");
const  {Server} = require("socket.io");


const app = express();
 
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("A new user has connected ",socket.id);
    
    socket.on("chat message", (msg) => {
        console.log("Message received:", msg);
        io.emit("chat message", msg);
    });
    
    socket.on('disconnect', () => {
    console.log('user disconnected',socket.id);
  });
})


app.use(express.static(path.join("./public")));


app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(3000,(req,res)=>{
    console.log("server is running at 3000");
})