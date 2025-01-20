const eventEmitter = require("events");

const myEventEmitter = new eventEmitter();

myEventEmitter.on("newSale", () => {
  console.log("new sale is active");
});

myEventEmitter.on("newSale", () => {
  console.log("customer : harsh sachan");
});

myEventEmitter.emit("newSale", 9);
