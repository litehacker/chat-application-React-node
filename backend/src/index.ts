import http from "http"; // 1 - Import Node.js core module

var server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write("<html><body><p>This is home Page.1</p></body></html>");
    res.end();
  }
});

server.listen(5000); //3 - listen for any incoming requests

console.log(`Node.js web server at port ${5000} is running..`);
