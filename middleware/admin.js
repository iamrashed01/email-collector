module.exports = async (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    message: 'you are not authorized to access this',
    success: false,
  });
};
