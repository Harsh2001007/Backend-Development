const express = require('express');
const path = require('path');
const tourRouter = require('./routes/tourRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dev-data', 'img')));
app.use('/api/v1/tours', tourRouter);

// Test route to debug
app.get('/test-path', (req, res) => {
  res.send(
    `Serving static files from: ${path.join(__dirname, 'dev-data', 'img')}`
  );
});

app.get('/', (req, resp) => {
  resp.status(200).send('I am from the home page');
});

app.get('/dashboard', (req, resp) => {
  resp.status(404).send('I am from the dashboard but belongs to 404');
});

app.get('/jsondata', (req, resp) => {
  resp.status(200).json({
    screenName: 'jsondata',
    portNumber: 5556,
    author: 'harsh sachan',
    gamingName: 'Dr. POISON',
  });
});

module.exports = app;
