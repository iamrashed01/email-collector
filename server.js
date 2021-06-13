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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', require('./route/auth'));
app.use('/api', require('./route/signature'));

// route not found error handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.json({ message: 'Route not found', success: false });
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
