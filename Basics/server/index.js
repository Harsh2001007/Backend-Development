const http = require("http");

const server = http.createServer((req, resp) => {
  resp.end("I am calling from server");
});

server.listen(8765, "127.0.0.1", () => {
  console.log("i am calling from server console log");
});
