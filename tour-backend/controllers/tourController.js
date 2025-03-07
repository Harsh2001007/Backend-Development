const Tour = require("../models/tourModel");

exports.getAllTour = async (req, resp) => {
  try {
    const tourData = await Tour.find();
    resp.status(200).json({
      status: "success",
      count: tourData.length,
      data: tourData,
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.postTour = async (req, resp) => {
  try {
    const newTour = await Tour.create(req.body);

    resp.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "doc not created",
      error: err,
    });
  }
};

exports.getParticularTour = async (req, resp) => {
  try {
    const particularTour = await Tour.findById(req.params.id);

    resp.status(200).json({
      status: "success",
      data: {
        particularTour,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.deleteParticularTour = async (req, resp) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    resp.status(200).json({
      status: "success",
      data: {
        deletedTour,
        id: req.params.id,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.updateTour = async (req, resp) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    resp.status(200).json({
      status: "document updated",
      tour: updateTour,
    });
  } catch (error) {
    resp.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
