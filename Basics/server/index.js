const http = require("http");
const url = require("url");

const server = http.createServer((req, resp) => {
  const pathName = req.url;

  if (pathName === "/overview") {
    resp.end("i belongs to overview section");
  } else if (pathName === "/product") {
    resp.end("i am from product section");
  } else {
    resp.writeHead(777);
    resp.end("page out break like a zombie appocalypse one");
  }
});

server.listen(8765, "127.0.0.1", () => {
  console.log("i am calling from server console log");
});
