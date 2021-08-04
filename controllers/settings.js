const Settings = require('../model/settings');

async function updateSettingsController(req, res, next) {
  let settings = await Settings.findOne();

  if (settings) {
    settings.profile_picture = req.body.profile_picture;
    settings.company_logo = req.body.company_logo;
    settings.company_url = req.body.company_url;
    settings.banner = req.body.banner;
    settings.first_name = req.body.first_name;
    settings.last_name = req.body.last_name;
    settings.job_title = req.body.job_title;
    settings.company_name = req.body.company_name;
    settings.office_phone = req.body.office_phone;
    settings.mobile_phone = req.body.mobile_phone;
    settings.email = req.body.email;
    settings.address = req.body.address;
    settings.website = req.body.website;
    settings.facebook_url = req.body.facebook_url;
    settings.twitter_url = req.body.twitter_url;
    settings.linkedin_url = req.body.linkedin_url;
    settings.instagram_url = req.body.instagram_url;
    settings.cta_copy = req.body.cta_copy;
    settings.cta_url = req.body.cta_url;
  } else {
    settings = await Settings({
      profile_picture: req.body.profile_picture,
      company_logo: req.body.company_logo,
      company_url: req.body.company_url,
      banner: req.body.banner,
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
      cta_copy: req.body.cta_copy,
      cta_url: req.body.cta_url,
    });
  }

  try {
    await settings.save();
    return res.status(200).json({
      message: 'settings updated successfully',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

async function getSettingsController(req, res, next) {
  try {
    const settings = await Settings.findOne().select('-_id');
    return res.status(200).json({
      data: settings,
      message: 'settings retrieved successfully',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  updateSettingsController,
  getSettingsController,
};