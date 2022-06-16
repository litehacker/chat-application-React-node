import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./InterfaceTypes/intex";
import { createServer } from "http";
import express from "express";

const app = express();
const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("ping", () => {
  console.log("ping, they say");
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("hello", () => {
    console.log("hello, they say", socket.id);
  });
});

httpServer.listen(5000);
