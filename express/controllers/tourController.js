const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, resp) => {
  try {
    const tourData = await Tour.find();
    resp.status(200).json({
      status: 'success',
      count: tourData.length,
      data: tourData,
    });
  } catch (err) {}
  resp.status(400).json({
    status: 'fail',
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

exports.getParticularTour = async (req, resp) => {
  try {
    const particularTour = await Tour.findById(req.params.id);

    resp.status(200).json({
      status: 'success',
      data: { particularTour },
    });
  } catch (err) {
    resp.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
