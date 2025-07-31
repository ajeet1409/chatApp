// const express =require('express')
import express from "express"

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
    origin: process.env.origin,   // frontend url 
    credentials:true 
}))
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



app.get('/he', function (req, res) {
    res.send('hello')
})

app.get("/user/:username",function(req,res){
    res.send(`name :${req.params.username}`)
})

server.listen(Port, function (req, res) {
    console.log(`server is running on port ${Port}`);

})