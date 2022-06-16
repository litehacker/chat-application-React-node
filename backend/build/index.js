"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http")); // 1 - Import Node.js core module
var server = http_1.default.createServer(function (req, res) {
    if (req.url == "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<html><body><p>This is home Page.1</p></body></html>");
        res.end();
    }
});
server.listen(5000); //3 - listen for any incoming requests
console.log("Node.js web server at port ".concat(5000, " is running.."));
