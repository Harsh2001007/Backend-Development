const express = require('express');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use((req, resp, next) => {
  console.log('bye from middleware');
  console.log(__dirname);
  next();
});

// Task -> Middlewares

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
