import { Server } from "socket.io";
import http from 'http';
import express from 'express';

// creating app
const app = express();

// creating http server
const server = http.createServer(app);
// creates socket server on top of http server
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

//this method return the socket id associated with the received receiver id.
export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {} //{userId:socketId}

io.on('connection',(socket)=>{
    console.log("a user connected ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefine") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnelineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the evnets. can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("User disconnected ", socket.id);
        delete userSocketMap[userId];
        console.log(Object.keys(userSocketMap));
        io.emit("getOnelineUsers", Object.keys(userSocketMap));

    })
})



export {app, io, server};