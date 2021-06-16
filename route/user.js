const router = require('express').Router();
const { profileController } = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @route api/profile
 * @method GET
 */

router.get('/profile', auth, admin, profileController);

module.exports = router;
