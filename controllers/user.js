const User = require('../model/user');

async function profileController(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        data: null,
        message: 'user couldn\'t found',
        success: false,
      });
    }

    return res.status(200).json({
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      message: 'user retrieved successfully',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  profileController,
};
