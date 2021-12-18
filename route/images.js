const router = require('express').Router();
const upload = require('../utils/multerForCdn');

/**
 * @params /api/postimage
 * @method POST
 */

router.post('/', upload.any(), (req, res) => {
  if (req.files.length > 0) {
    res.status(200).json({
      cdn: req.files[0].filename,
    });
  }
  return res.status(400).json({ message: 'could not make image cdn!' });
});

module.exports = router;
