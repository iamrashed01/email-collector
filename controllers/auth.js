// import externals
const bcrypt = require('bcrypt');

// import lcoals
const User = require('../model/user');

async function loginController(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(401)
      .json({ message: 'username or password not match!', success: false });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(401)
      .json({ message: 'username or password not match!', success: false });
  }

  const token = user.generateAuthToken();
  return res.status(200).json({
    data: {
      role: user.role,
      email: user.email,
    },
    auth_token: token,
    message: 'successfully log in',
    success: true,
  });
}

async function registerController(req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: 'user already registered', success: false });
  }
  const salt = await bcrypt.genSalt(10);
  user = await User({
    email: req.body.email,
    password: req.body.password,
  });
  user.password = await bcrypt.hash(req.body.password, salt);

  try {
    await user.save();
    return res.status(200).json({
      data: {
        email: user.email,
        role: user.role,
      },
      message: 'user registration successful',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  loginController,
  registerController,
};
