const router = require('express').Router();

// import locals
const { createSignature } = require('../controllers/signature');

/**
 * @params /api/create-signature
 * @body {object}
 * @method POST
 */
router.post('/create-signature', createSignature);

module.exports = router;
