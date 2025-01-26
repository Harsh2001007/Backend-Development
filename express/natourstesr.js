const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get api work tree
app.get('/api/v1/tours', (req, resp) => {
  resp.status(200).json({
    status: 'success',
    result: toursData.length,
    data: {
      toursData,
    },
  });
});

// get api with params

app.get('/api/v1/tours/:id', (req, resp) => {
  console.log(req.params);
  const tourId = req.params.id * 1;
  const tour = toursData.find((item) => item.id === tourId);

  if (tourId > toursData.length) {
    console.log('401 called');
    return resp.status(401).json({
      status: 'failed',
      message: 'invalid id on params',
    });
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// post api work tree
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
