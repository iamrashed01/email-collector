/* eslint-disable no-underscore-dangle */
const geoip = require('geoip-lite');
const Host = require('../model/host');
const Email = require('../model/email');

async function createSignature(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

  const geo = geoip.lookup(ip);

  let host = await Host.findOneAndUpdate({ ip }, { $inc: { visit_count: 1 } }, { new: true });
  if (!host) {
    host = await Host({
      ip,
      geo,
    });

    try {
      await host.save();
    } catch (err) {
      return next(err);
    }
  }

  let email = await Email.findOne({ email: req.body.email });
  if (!email) {
    email = await Email({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      job_title: req.body.job_title,
      company_name: req.body.company_name,
      office_phone: req.body.office_phone,
      mobile_phone: req.body.mobile_phone,
      email: req.body.email,
      address: req.body.address,
      website: req.body.website,
      facebook_url: req.body.facebook_url,
      twitter_url: req.body.twitter_url,
      linkedin_url: req.body.linkedin_url,
      instagram_url: req.body.instagram_url,
      host_ids: host._id,
    });
  } else {
    email.first_name = req.body.first_name;
    email.last_name = req.body.last_name;
    email.job_title = req.body.job_title;
    email.company_name = req.body.company_name;
    email.office_phone = req.body.office_phone;
    email.mobile_phone = req.body.mobile_phone;
    email.address = req.body.address;
    email.website = req.body.website;
    email.facebook_url = req.body.facebook_url;
    email.twitter_url = req.body.twitter_url;
    email.linkedin_url = req.body.linkedin_url;
    email.instagram_url = req.body.instagram_url;

    if (!email.host_ids.includes(host._id)) {
      email.host_ids.push(host._id);
    }
  }

  try {
    await email.save();

    return res.json({
      message: 'signature created successfully',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createSignature,
};
