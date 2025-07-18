const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsynch");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const { decode } = require("punycode");

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
    status: "done",
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

exports.protect = catchAsync(async (req, resp, next) => {
  // 1) Getting token and check if it is there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! please log in to get access.")
    );
  }

  // 2) Verification of token

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists

  const freshUser = await User.findById(decodedToken.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exists.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued.

  if (freshUser.changedPasswordAfter(decodedToken.iat)) {
    return next(new AppError("User recently changed the password", 401));
  }

  // FINAL : Grant access to protected routes
  req.user = freshUser;
  next();
});
