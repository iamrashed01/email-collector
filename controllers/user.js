const User = require('../model/user');

async function profileController(req, res) {
  const user = await User.findById(req.user._id);
  return res.status(200).json({
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    message: 'user retrieved successfully',
    success: true,
  });
}

module.exports = {
  profileController,
};
