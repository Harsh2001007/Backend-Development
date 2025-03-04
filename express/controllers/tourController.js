const Tour = require('./../models/tourModel');

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
  });
};

exports.postTour = async (req, resp) => {
  try {
    const newTour = await Tour.create(req.body);

    resp.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    resp.status(201).json({
      status: 'fail',
      data: {
        error: err,
      },
    });
  }
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
};
