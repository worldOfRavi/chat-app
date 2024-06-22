import path from "path";
import "dotenv/config";
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import connectDb from "./db/connectDB.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();
// import cors from 'cors';

// creating app
const PORT =  process.env.PORT || 5000;


// middlewares
app.use(express.json()); //to parse the incoming request with the json payload
app.use(cookieParser());
// app.use(cors({origin:"http://localhost:3000", credentials:true} ));
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/user',userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
 

connectDb().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server is running at port no ${PORT}`);
    })
})
