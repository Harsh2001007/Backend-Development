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

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

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
