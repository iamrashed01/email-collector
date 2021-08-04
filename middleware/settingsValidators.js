const { check, validationResult } = require('express-validator');

const doSettingsValidators = [
  check('profile_picture')
    .isString()
    .withMessage('profile picture must be string'),
  check('company_logo')
    .isString()
    .withMessage('company logo must be string'),
  check('company_url')
    .isString()
    .withMessage('company url must be string'),
  check('banner')
    .isString()
    .withMessage('banner must be string'),
  check('first_name')
    .isString()
    .withMessage('first name must be string'),
  check('last_name')
    .isString()
    .withMessage('last name must be string'),
  check('job_title')
    .isString()
    .withMessage('job title must be string'),
  check('company_name')
    .isString()
    .withMessage('company name must be string'),
  check('office_phone')
    .isString()
    .withMessage('office phone must be string'),
  check('mobile_phone')
    .isString()
    .withMessage('mobile phone must be string'),
  check('email')
    .isEmail()
    .withMessage('email is required'),
  check('address')
    .isString()
    .withMessage('address must be string')
    .isLength({ max: 255 })
    .withMessage('address length must be smaller than 255 and characters'),
  check('website')
    .isString()
    .withMessage('website must be string'),
  check('facebook_url')
    .isString()
    .withMessage('facebook url must be string'),
  check('twitter_url')
    .isString()
    .withMessage('twitter url must be string'),
  check('linkedin_url')
    .isString()
    .withMessage('linkedin url must be string'),
  check('instagram_url')
    .isString()
    .withMessage('instagram url must be string'),
  check('cta_copy')
    .isString()
    .withMessage('cta copy must be string'),
  check('cta_url')
    .isString()
    .withMessage('cta url must be string'),
];

const doSettingsValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
      success: false,
    });
  }
};

module.exports = {
  doSettingsValidators,
  doSettingsValidatorHandler,
};
