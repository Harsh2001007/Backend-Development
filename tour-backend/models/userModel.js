const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email address"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords do not match.",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
