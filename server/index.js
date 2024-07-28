if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const {Server} = require('socket.io')
const http = require('http');





const app = express()
app.use(cors());
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credential: true
    }
})


// io.on("connection",(socket)=>{
//     console.log("socket id is ",socket.id)
//     socket.on("message",(msg)=>{
//         console.log("The message is" , msg)
//     })
// })



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}






app.use(express.json());
app.use(express.urlencoded({ extended: true }));



server.listen(8080, () => {
    console.log("App is running on 8080");
});


//import Route
const userRoute = require("./routes/userRoutes")
const messageRoute = require("./routes/messagesRoute")


//using routes
app.use("/auth",userRoute);
app.use("/messages",messageRoute)






global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket
    socket.on("add-user",(userId)=>{
        console.log(socket.id)
        onlineUsers.set(userId,socket.id)
        
    })
    socket.on("send-msg",(data)=>{
        console.log(onlineUsers)
       const sendUserSocket = onlineUsers.get(data.to)
       if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.message)
       }
    })

})


//error handlerwhy
app.use((err,req,res,next)=>{
    console.log(err.message);
    let {statusCode = 500, message = "Somthing went wrong" } = err
    res.status(statusCode).json({errors: message});
})  


