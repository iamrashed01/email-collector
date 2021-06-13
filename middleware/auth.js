const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: 'Please provide a valid token',
      success: false,
    });
  }

  try {
    const decoded = await jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_PRIVATE_KEY,
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' });
  }
};
