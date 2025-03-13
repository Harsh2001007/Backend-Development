const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Tour = require("./../../models/tourModel");
// const ts = require('./../../../tour-backend/config.env')

dotenv.config({ path: "./../../../tour-backend/config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("error connecting DB", err);
  });

//READ json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//  IMORT DATA into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data added successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA from DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (error) {
    console.log("data deletion failed");
  }
  process.exit();
};

console.log(process.argv, "######");

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
