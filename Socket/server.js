import { Server } from "socket.io";
import dotenv from 'dotenv'
import http from "http";
import express from "express";

const app = express();
dotenv.config()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    method: ["GET", "POST"],
    credentials:true
  },
});


// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  console.log("New client connect ", socket.id);

  const userId = socket.handshake.query.userId;
  // console.log(userId);

  if (userId) {
    users[userId] = socket.id;
    console.log("hello ", users);
  }

  // io.emit to get how many user online  or offline
  io.emit("getonline", Object.keys(users))


  //! used to listen client side events emitted by server side (server & client)

  socket.on("disconnect", () => {
    console.log("client diconnect", socket.id);

    delete users[userId]
    io.emit("getonline", Object.keys(users))
  });
});

export { app, io, server };
