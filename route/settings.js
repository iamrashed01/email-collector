const route = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { updateSettingsController, getSettingsController } = require('../controllers/settings');
const { doSettingsValidators, doSettingsValidatorHandler } = require('../middleware/settingsValidators');

/**
 * @params /api/settings
 * @method GET
 */

route.get('/', getSettingsController);

/**
 * @params /api/settings
 * @method POST
 */

route.post('/', [auth, admin], doSettingsValidators, doSettingsValidatorHandler, updateSettingsController);

module.exports = route;
