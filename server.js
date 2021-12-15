// import externals
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// import locals
const connectToDB = require('./config/connectToDB');

// initialize app
const app = express();
require('dotenv').config();

// middlewares
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads/'));

// routes
app.use('/api/auth', require('./route/auth'));
app.use('/api', require('./route/signature'));
app.use('/api/email', require('./route/email'));
app.use('/api', require('./route/user'));
app.use('/api/settings', require('./route/settings'));
app.use('/api/status', require('./route/status'));

// route not found error handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found', success: false });
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500)
    .json({ message: err.message || 'Something went wrong!', success: false });
});

// app listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port at: ${port}`);

  // database connection
  connectToDB();
});
