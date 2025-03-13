const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

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

app.listen(
  Number(process.env.PORT, () => {
    console.log("server started at ", process.env.PORT);
  })
);
