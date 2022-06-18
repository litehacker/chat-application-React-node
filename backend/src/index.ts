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

  socket.on("/nick", (user: UserType) => {
    console.log("command name", user);
    let tmpRoomId = users.find((u) => u.userId === user.id)?.roomId;
    io.to(tmpRoomId ? tmpRoomId : "unknown room").emit("/nick", user);
  });

  socket.on("/oops", (payloadID: string, messages: MessageType[]) => {
    const room: string | undefined = users.find(
      (room) => room.userId === payloadID
    )?.roomId;
    const index = messages.map((m) => m.author.id).lastIndexOf(payloadID);
    if (index !== -1) messages.splice(index, 1);
    io.to(room ? room : "undefined room").emit("/oops", messages);
  });

  socket.on("/fadelast", (payloadID: string) => {
    console.log("fade started", payloadID);
    const room: string | undefined = users.find(
      (room) => room.userId === payloadID
    )?.roomId;
    io.to(room ? room : "undefined room").emit("/oops", payloadID);
  });
});

httpServer.listen(5000);
