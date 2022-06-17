import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  MessageType,
  UserType,
} from "./InterfaceTypes/intex";
import { createServer } from "http";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("ping", () => {
  console.log("ping, they say");
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.join("private room");
  socket.on("hello", (payload: UserType) => {
    console.log("hello, they say", payload.name);
  });
  socket.on("message", (payload: MessageType) => {
    io.to("private room").emit("message", payload);
    console.log(payload.content, " says ", payload.author.name);
  });
});

httpServer.listen(5000);
