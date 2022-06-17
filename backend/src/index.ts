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
let users: { roomId: string; userId: string; userName?: string }[] = [];

let roomID: string = "";
io.on("connection", (socket) => {
  console.log("connection", socket.id);

  // on order to separate each two users by one room,
  if (users.length % 2 === 0) {
    roomID = uuid();
  }

  console.log(socket.id, " in room #", roomID);
  socket.join(roomID);

  socket.on("message", (payload: MessageType) => {
    const room: string | undefined = users.find(
      (room) => room.userId === payload.author.id
    )?.roomId;
    io.to(room ? room : "undefined room").emit("message", payload);
  });

  socket.on("add user", (payload) => {
    users.push({ roomId: roomID, userId: socket.id, userName: payload });
    // send them their names
    if (users.length % 2 === 0) {
      io.to(users[users.length - 1].roomId).emit("users", [
        users[users.length - 1].userName,
        users[users.length - 2].userName,
      ]);
    }
  });
  socket.on("command name", (user: UserType) => {
    console.log("command name");
  });
  socket.on("command message", (user: UserType) => {
    console.log("command message");
  });
  socket.on("command oops", (user: UserType) => {
    console.log("command oops");
  });
});

httpServer.listen(5000);
