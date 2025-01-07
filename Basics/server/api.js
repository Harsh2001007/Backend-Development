const fs = require("fs");
const http = require("http");
const { type } = require("os");
const { json } = require("stream/consumers");
const url = require("url");

const textData = fs.readFileSync("./Data.txt", "utf-8");
const apiData = fs.readFileSync("./main.json", "utf-8");
console.log(typeof apiData);

const server = http.createServer((req, resp) => {
  const path = req.url;

  if (path === "/text-data") {
    resp.end(textData);
    console.log(typeof apiData);
  } else if (path === "/api-data") {
    resp.writeHead(200, {
      "content-type": "application/json",
    });
    resp.end(apiData);
  } else {
    resp.end("404 not found");
  }
});

server.listen(8888, "127.0.0.1", () => {
  console.log("server started");
});
