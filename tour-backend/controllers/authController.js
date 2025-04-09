const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsynch");

exports.signUp = catchAsync(async (req, resp, next) => {
  const newUser = await User.create(req.body);

  resp.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
