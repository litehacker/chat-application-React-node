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
let rooms: { roomId: string; userId: string }[] = [];

let roomID: string = "";
io.on("connection", (socket) => {
  console.log("connection", socket.id);
  // on order to separate each two users by one room,

  if (rooms.length % 2 === 0) {
    roomID = uuid();
    //countUsers = 0; // reset users
  }
  rooms.push({ roomId: roomID, userId: socket.id });

  console.log(socket.id, " in room #", roomID);
  socket.join(roomID);

  socket.on("message", (payload: MessageType) => {
    const room: string | undefined = rooms.find(
      (room) => room.userId === payload.author.id
    )?.roomId;
    io.to(room ? room : "undefined room").emit("message", payload);
    console.log(
      payload.content,
      " says ",
      payload.author.name,
      payload.author.id
    );
  });
});

httpServer.listen(5000);
