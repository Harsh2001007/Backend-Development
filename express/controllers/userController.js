exports.getAllUsers = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'failed response',
  });
};

exports.postUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'failed',
  });
};

exports.getParticularUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'fail',
  });
};

exports.patchUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'failed response',
  });
};

exports.deleteUser = (req, resp) => {
  resp.status(500).json({
    message: 'internal error',
    status: 'fail',
  });
};
