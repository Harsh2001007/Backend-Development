// reading file data
const fs = require("fs");
const textIn = fs.readFileSync("DataOne.txt", "utf-8");
console.log(textIn);

// writing or creating files
fs.writeFileSync("output.txt", "this is the data printing", "utf-8");
console.log("file written");
