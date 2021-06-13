const { check, validationResult } = require('express-validator');

const doRegisterValidators = [
  check('email')
    .isEmail()
    .withMessage('email is required'),
  check('password')
    .isLength({ min: 8, max: 20 })
    .withMessage('password length must be between 6-20 and characters long')
    .isStrongPassword()
    .withMessage('password must contain special characters numbers upper and lowercase letters'),
];

const doRegisterValidatorHandler = function (req, res, next) {
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
  doRegisterValidators,
  doRegisterValidatorHandler,
};
