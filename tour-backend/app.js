const express = require("express");
const tourRoutes = require("./routes/tourRoutes");

const app = express();

// Middle wares
app.use(express.json());
app.use("/api/v1/tours", tourRoutes);

module.exports = app;
