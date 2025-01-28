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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', postTour);
// app.patch('/api/v1/tours/:id', postTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(postTour);
app.route('/api/v1/tours/:id').patch(patchTour).delete(deleteTour);

app.listen(5556, () => {
  console.log('api started');
});
