/* eslint-disable camelcase */
const router = require('express').Router();
const Host = require('../model/host');
const Email = require('../model/email');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', [auth, admin], async (req, res, next) => {
  try {
    const total_hosts = await Host.countDocuments();
    const total_emails = await Email.countDocuments();

    return res.status(200).json({
      data: {
        total_hosts,
        total_emails,
      },
      message: 'successfully retrieved data',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
