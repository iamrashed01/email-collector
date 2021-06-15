const router = require('express').Router();
const { profileController } = require('../controllers/user');
const auth = require('../middleware/auth');

/**
 * @route api/profile
 * @method GET
 */

router.get('/profile', auth, profileController);

module.exports = router;
