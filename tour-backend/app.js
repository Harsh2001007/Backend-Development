const express = require("express");
const tourRoutes = require("./routes/tourRoutes");

const app = express();

// Middle wares
app.use(express.json());
app.use("/api/v1/tours", tourRoutes);

app.all("*", (req, resp, next) => {
  //   resp.status(404).json({
  //     status: "fail",
  //     message: `can't find ${req.originalUrl} on this server`,
  //   });

  const err = new Error(`can't find ${req.originalUrl} on this server`);
  (err.status = "fail"), (err.statusCode = 404);

  next(err);
});

// express error middleware

app.use((err, req, resp, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  resp.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
