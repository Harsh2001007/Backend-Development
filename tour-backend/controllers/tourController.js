const Tour = require("../models/tourModel");

exports.aliasTopTour = (req, resp, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Advance Filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
  }
}

exports.getAllTour = async (req, resp) => {
  try {
    // const queryObj = { ...req.query };

    // const excludeFields = ["page", "sort", "limit", "fields"];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);

    // 1.  Advance filtering

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr), typeof queryStr);

    // let query = Tour.find(JSON.parse(queryStr));

    // 2.  Sorting

    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // 3.  Field limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4. Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }

    // Executing Query

    const features = new APIFeatures(Tour.find(), req.query).filter();
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
