// import externals
const router = require('express').Router();

// import locals
const { getAllEmails } = require('../controllers/email');
const auth = require('../middleware/auth');

/**
 * @params /api/email
 * @method GET
 */
router.get('/', auth, getAllEmails);

module.exports = router;
