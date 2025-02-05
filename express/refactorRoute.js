const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
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

const getParticularTour = (req, resp) => {
  console.log(req.params);
  const tourId = req.params.id * 1;
  const tour = toursData.find((item) => item.id === tourId);

  if (tourId > toursData.length) {
    console.log('401 called');
    return resp.status(401).json({
      status: 'failed',
      message: 'invalid id on params for particular user',
    });
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const getAllUsers = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'fail',
  });
};

const postUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'failed',
  });
};

const getParticularUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'fail',
  });
};

const patchUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'failed response',
  });
};

const deleteUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'fail',
  });
};

app.route('/api/v1/tours').get(getAllTours).post(postTour);
app
  .route('/api/v1/tours/:id')
  .get(getParticularTour)
  .patch(patchTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(postUser);
app
  .route('/api/v1/users/:id')
  .get(getParticularUser)
  .patch(patchUser)
  .delete(deleteUser);

app.listen(5556, () => {
  console.log('api started');
});
