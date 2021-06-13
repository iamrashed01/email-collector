const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 20,
    min: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, { timestamp: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    email: this.email,
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    role: this.role,
  }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
