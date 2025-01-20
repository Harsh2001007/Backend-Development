const express = require('express');

const app = express();

const port = 5555;

app.get('/', (req, resp) => {
  resp.status(200).send('i am from home page');
});

app.get('/dashboard', (req, resp) => {
  resp.status(404).send('i am from dashboard but belongs to 404');
});

app.get('/jsondata', (req, resp) => {
  resp.status(200).json({
    screenName: 'jsondata',
    portNumber: port,
    author: 'harsh sachan',
  });
});

app.listen(port, () => {
  console.log('server started');
});
