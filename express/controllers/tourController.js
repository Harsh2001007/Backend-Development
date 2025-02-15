const fs = require('fs');

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    result: toursData.length,
    data: {
      toursData,
    },
  });
};

exports.postTour = (req, resp) => {
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

exports.patchTour = (req, resp) => {
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

exports.deleteTour = (req, resp) => {
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

exports.getParticularTour = (req, resp) => {
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
