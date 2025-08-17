// const express =require('express')
import express from "express"

import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from "./routes/userRoutes.js"
import messageRoute from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import { app,server,io } from "./Socket/server.js"
import cors from 'cors'


// const app = express()
dotenv.config()
app.use(cookieParser());

const Port = process.env.PORT 
const URL = process.env.MONGODB_URI;

app.use(cors({
    origin: process.env.ORIGIN,   // frontend url 
    credentials:true 
}))

// app.get("/api/getUserInfo", (req, res) => {
//     const token = req.cookies.token; // backend reads it
//     if (!token) return res.status(401).json({ message: "Unauthorized" });
  
//     // verify token...
//     res.json(token);
//   });

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',userRoute)
app.use('/api/message',messageRoute)

try {
    mongoose.connect(URL)
    .then(console.log("Mongodb connect")
    )
} catch (error) {
    console.log(`Mongodb not connected: ${error.message}`);
    
    
}

if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve()
    app.use(express.static("./frontend/dist"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"))
    })
}


// app.get('/he', function (req, res) {
//     res.send('hello')
// })

// app.get("/user/:username",function(req,res){
//     res.send(`name :${req.params.username}`)
// })



server.listen(Port, function (req, res) {
    console.log(`server is running on port ${Port}`);

})