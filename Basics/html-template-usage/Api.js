const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/temp-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, resp) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    resp.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCards, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    resp.end(output);
  } else if (pathname === "/product") {
    resp.writeHead(200, {
      "Content-Type": "text/html",
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    console.log(tempProduct);
    console.log(product);

    resp.end(output);
  } else if (pathname === "/test") {
    resp.end("testing nodemon for continuous development");
  }
});

server.listen(9000, "127.0.0.1", () => {
  console.log("server stated at 9000");
});
