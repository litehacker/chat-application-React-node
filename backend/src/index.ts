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
import { uuid } from "uuidv4";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let countUsers: number = 0;
let rooms: UserType[] = [];

io.on("ping", () => {
  console.log("ping, they say");
});

let roomID: string = "";
io.on("connection", (socket) => {
  console.log("connection", socket.id);
  // on order to separate each two users by one room,

  if (countUsers % 2 === 0) {
    roomID = uuid();
    countUsers = 0; // reset users
  }

  console.log(socket.id, " in room #", roomID);
  countUsers++;
  socket.join(roomID);

  socket.on("message", (payload: MessageType) => {
    io.to(roomID).emit("message", payload);
    console.log(
      payload.content,
      " says ",
      payload.author.name,
      payload.author.id
    );
  });
});

httpServer.listen(5000);
