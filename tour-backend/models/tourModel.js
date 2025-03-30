const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      maxLength: [40, "Tour lenght can not be more than 40"],
      minLength: [6, "Tour legth can not be less than 6"],
      // validate: [validator.isAlpha, "name must only contain alphabets"],
    },
    slug: String,
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
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "values can only be easy, medium, difficult",
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
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
    secretTour: {
      type: Boolean,
      default: false,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "Discount price should be less than actual price",
      },
    },

    rating: {
      type: Number,
      default: 4.0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have price"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//Document middleware

// tourSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   console.log('saving start')
//   next();
// });

// tourSchema.pre("save", function (next) {
//   console.log("will save the data");
//   next();
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
