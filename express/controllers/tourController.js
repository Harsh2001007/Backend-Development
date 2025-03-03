const Tour = require('./../models/tourModel');

exports.checkBody = (req, resp, next) => {
  if (!req.body.name || !req.body.price) {
    return resp.status(400).json({
      status: 'failed',
      message: 'name or price is missing.',
    });
  }
  next();
};

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    // result: toursData.length,
    // data: {
    //   toursData,
    // },
  });
};

exports.postTour = (req, resp) => {
  resp.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.patchTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ....>',
    },
  });
};

exports.deleteTour = (req, resp) => {
  resp.status(201).json({
    status: 'success deleted id',
    data: null,
  });
};

exports.getParticularTour = (req, resp) => {
  const tourId = req.params.id * 1;
  // const tour = toursData.find((item) => item.id === tourId);
  // resp.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};
