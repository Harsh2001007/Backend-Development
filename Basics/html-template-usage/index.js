const fs = require("fs");

const http = require("http");

const server = http.createServer((req, resp) => {
  console.log("server iniitated");
  const path = req.url;

  if (path === "/" || path === "/overview") {
    resp.end("i am from overview");
  } else {
    resp.end("i am from other urls");
  }
});

server.listen(9000, "127.0.0.1", () => {
  console.log("server started");
});
