const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use((req, resp, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, resp) => {
  console.log(req.requestTime);
  resp.status(200).json({
    status: 'success',
    type: 'GET',
    requestedAt: req.requestTime,
    result: toursData.length,
    data: {
      toursData,
    },
  });
};

const postTour = (req, resp) => {
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
};

const patchTour = (req, resp) => {
  if (req.params.id * 1 > toursData.length) {
    return resp.status(401).json({
      status: 'failed',
      message: 'invalid id',
    });
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ....>',
    },
  });
};

const deleteTour = (req, resp) => {
  if (req.params.id * 1 > toursData.length) {
    return resp.status(401).json({
      status: 'failed',
      message: 'invalid id',
    });
  }

  resp.status(201).json({
    status: 'success deleted id',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(postTour);
app.route('/api/v1/tours/:id').patch(patchTour).delete(deleteTour);

app.listen(5556, () => {
  console.log('api started');
});
