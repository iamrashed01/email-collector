const mongoose = require('mongoose');

const Settings = mongoose.model('Settings', mongoose.Schema({
  profile_picture: { type: String },
  company_logo: { type: String },
  company_url: { type: String },
  banner: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  job_title: { type: String },
  company_name: { type: String },
  office_phone: { type: String },
  mobile_phone: { type: String },
  email: { type: String },
  address: { type: String },
  description: { type: String },
  website: { type: String },
  facebook_url: { type: String },
  twitter_url: { type: String },
  linkedin_url: { type: String },
  instagram_url: { type: String },
  cta_copy: { type: String },
  cta_url: { type: String },
}));

module.exports = Settings;
