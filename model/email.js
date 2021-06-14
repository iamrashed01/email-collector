const mongoose = require('mongoose');

const Email = mongoose.model('Email', mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: String,
  last_name: String,
  job_title: String,
  company_name: String,
  office_phone: String,
  mobile_phone: String,
  address: String,
  website: String,
  facebook_url: String,
  twitter_url: String,
  linkedin_url: String,
  instagram_url: String,
  host_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Host',
    },
  ],
}, { timestamp: true }));

module.exports = Email;
