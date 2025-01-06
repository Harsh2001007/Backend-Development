const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");

const apiData = fs.readFileSync("./Data.txt", "utf-8");
const jsonData = JSON.parse(apiData);

const server = http.createServer((req, resp) => {
  const path = req.url;

  if (path === "/api-data") {
    resp.end(apiData);
  }
});

server.listen(8888, "127.0.0.1", () => {
  console.log("server started");
});
