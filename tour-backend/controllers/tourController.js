const Tour = require("../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopTour = (req, resp, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = async (req, resp) => {
  try {
    // Executing Query

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tourData = await features.query;

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
      status: "tour created",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "doc not created, plz check error",
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

exports.getTourStats = async (req, resp) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      {
        $match: { _id: { $ne: "EASY" } },
      },
    ]);

    resp.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getTourStatsPartTwo = async (req, resp) => {
  try {
    const statsTwo = await Tour.aggregate([
      { $match: { maxGroupSize: { $gte: 15 } } },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          testDataOne: { $avg: "$ratingAverage" },
        },
      },
    ]);

    resp.status(200).json({
      status: "success",
      data: {
        statsTwo,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getMonthlyPlan = async (req, resp) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      // {
      //   $addFields: { month: "$id" },
      // },
    ]);

    resp.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
