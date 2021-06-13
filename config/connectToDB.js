/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => console.log('mongoDB connection successful'))
    .catch(() => console.log('mongoDB connection failed!'));
};
