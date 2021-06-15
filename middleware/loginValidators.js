const { check, validationResult } = require('express-validator');

const doLoginValidators = [
  check('email')
    .isEmail()
    .withMessage('email is required'),
  check('password').isLength({ min: 6, max: 20 }).withMessage('password length must be between 6-20 and characters long'),
];

const doLoginValidatorHandler = function (req, res, next) {
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
  doLoginValidators,
  doLoginValidatorHandler,
};
