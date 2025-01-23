const express = require('express');
const fs = require('fs');

const app = express();

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v1/tours', (req, resp) => {
  resp.status(200).json({
    status: 'success',
    result: toursData.length,
    data: {
      toursData,
    },
  });
});

app.listen(5556, () => {
  console.log('api started');
});
