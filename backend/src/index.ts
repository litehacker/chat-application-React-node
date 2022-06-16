import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./InterfaceTypes/intex";

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

app.get("/", (req: any, res: any) => {
  res.send("<h1>Hello world</h1>");
});
io.on("ping", () => {
  console.log("ping, they say");
});
io.on("connection", (socket) => {
  socket.on("hello", () => {
    console.log("hello, they say");
  });
  socket.emit("noArg");
  socket.emit("basicEmit", 1, "2", Buffer.from([3]));
  socket.emit("withAck", "4", (e) => {
    // e is inferred as number
  });

  // works when broadcast to all
  io.emit("noArg");

  // works when broadcasting to a room
  io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
