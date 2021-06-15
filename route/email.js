// import externals
const router = require('express').Router();

// import locals
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAllEmails, deleteEmail, exportAllEmails } = require('../controllers/email');

/**
 * @params /api/email
 * @method GET
 */
router.get('/', auth, admin, getAllEmails);

/**
 * @params /api/email/id
 * @method DELETE
 */
router.delete('/:id', auth, admin, deleteEmail);

/**
 * @params /api/email/export-all
 * @method GET
 */
router.get('/export-all', auth, admin, exportAllEmails);

module.exports = router;
