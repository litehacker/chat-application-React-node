"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var uuidv4_1 = require("uuidv4");
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});
var users = [];
var roomID = "";
io.on("connection", function (socket) {
    console.log("connection", socket.id);
    // on order to separate each two users by one room,
    if (users.length % 2 === 0) {
        roomID = (0, uuidv4_1.uuid)();
    }
    console.log(socket.id, " in room #", roomID);
    socket.join(roomID);
    socket.on("message", function (payload) {
        var _a;
        var room = (_a = users.find(function (room) { return room.userId === payload.author.id; })) === null || _a === void 0 ? void 0 : _a.roomId;
        io.to(room ? room : "undefined room").emit("message", payload);
    });
    socket.on("add user", function (payload) {
        users.push({ roomId: roomID, userId: socket.id, userName: payload });
        // send them their names
        if (users.length % 2 === 0) {
            io.to(users[users.length - 1].roomId).emit("users", [
                users[users.length - 1].userName,
                users[users.length - 2].userName,
            ]);
        }
    });
    socket.on("/nick", function (user) {
        var _a;
        console.log("command name", user);
        var tmpRoomId = (_a = users.find(function (u) { return u.userId === user.id; })) === null || _a === void 0 ? void 0 : _a.roomId;
        io.to(tmpRoomId ? tmpRoomId : "unknown room").emit("/nick", user);
    });
    socket.on("/oops", function (payloadID, messages) {
        var _a;
        var room = (_a = users.find(function (room) { return room.userId === payloadID; })) === null || _a === void 0 ? void 0 : _a.roomId;
        var index = messages.map(function (m) { return m.author.id; }).lastIndexOf(payloadID);
        if (index !== -1)
            messages.splice(index, 1);
        io.to(room ? room : "undefined room").emit("/oops", messages);
    });
    socket.on("/fadelast", function (payloadID, messages) {
        var _a;
        var room = (_a = users.find(function (room) { return room.userId === payloadID; })) === null || _a === void 0 ? void 0 : _a.roomId;
        var index = messages.map(function (m) { return m.author.id; }).lastIndexOf(payloadID);
        if (index !== -1)
            messages.splice(index, 1, __assign(__assign({}, messages[index]), { faded: true }));
        io.to(room ? room : "undefined room").emit("/fadelast", messages);
    });
    socket.on("/countdown", function (payload) {
        var _a;
        console.log("command countdown", payload.user);
        var tmpRoomId = (_a = users.find(function (u) { return u.userId === payload.user.id; })) === null || _a === void 0 ? void 0 : _a.roomId;
        io.to(tmpRoomId ? tmpRoomId : "unknown room").emit("/countdown", payload);
    });
});
httpServer.listen(5000);
