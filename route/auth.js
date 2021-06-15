// import externals
const router = require('express').Router();

// import locals
const { loginController, registerController } = require('../controllers/auth');
const {
  doLoginValidators,
  doLoginValidatorHandler,
} = require('../middleware/loginValidators');
// const {
//   doRegisterValidators,
//   doRegisterValidatorHandler,
// } = require('../middleware/registerValidators');

/**
 * @params /api/auth/login
 * @body email,password
 * @method GET
 */

router.post(
  '/login',
  doLoginValidators,
  doLoginValidatorHandler,
  loginController,
);

/**
 * @params /api/auth/register
 * @body email,password
 * @method POST
 */

// router.post(
//   '/register',
//   doRegisterValidators,
//   doRegisterValidatorHandler,
//   registerController,
// );

module.exports = router;
