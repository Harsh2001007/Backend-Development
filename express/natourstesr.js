const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

app.post('/api/v1/tours', (req, resp) => {
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  toursData.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      resp.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(5556, () => {
  console.log('api started');
});
