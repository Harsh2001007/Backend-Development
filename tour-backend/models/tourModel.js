const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "max group size is required"],
  },
  difficulty: {
    type: String,
    required: [true, "difficulty is required"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "summary is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "image cover url is required"],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: {
    type: [Date],
  },
  priceDiscount: {
    type: Number,
  },

  rating: {
    type: Number,
    default: 4.0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
