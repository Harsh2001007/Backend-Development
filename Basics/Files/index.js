const file = require("fs");

file.readFile("DataOne.txt", "utf-8", (error, data) => {
  file.readFile("DataTwo.txt", "utf-8", (err, data) => {
    file.readFile("DataThree.txt", "utf-8", (err, data) => {
      console.log(data);
    });
  });
});

console.log("bye");
