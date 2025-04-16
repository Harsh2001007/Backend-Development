const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsynch");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, resp, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id);

  resp.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, resp, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  // check if user exists and password is correct

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPass(password, user.password))) {
    return next(new AppError("Incorrect email and password", 401));
  }
  // if everything is ok then send token to client

  const token = signToken(user._id);
  resp.status(200).json({
    status: "success",
    token,
  });
});
