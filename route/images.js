const router = require('express').Router();
const path = require('path');
const glob = require('glob');
const { v4: uuidv4 } = require('uuid');
const { unlinkSync } = require('fs');
const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @params /api/postimage
 * @method POST
 */

router.post('/', upload.any(), async (req, res) => {
  if (req.files[0].mimetype !== 'image/jpeg' && req.files[0].mimetype !== 'image/png') {
    return res.status(400).json({ message: 'image only allowed jpeg/png' });
  }

  fs.access('./uploads', (error) => {
    if (error) {
      fs.mkdirSync('./uploads');
    }
  });

  let ipNum = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  if (ipNum) {
    ipNum = ipNum.replace(/[^0-9.]/g, '');
  }

  const deleteOldAssets = new Promise((resolve) => {
    // find old files
    glob(`**/ipn=${ipNum}${req.files[0].fieldname}-*`, null, async (er, files) => {
      // eslint-disable-next-line
      for await (const file of files) {
        // remove file
        unlinkSync(file, (err) => {
          // eslint-disable-next-line no-console
          if (err) console.log(err);
          // eslint-disable-next-line no-console
          console.log('file deleted successfully', file);
        });
      }
      resolve('deleted');
    });
  });

  return deleteOldAssets
    .then(async () => {
      const uid = uuidv4();

      const { buffer, fieldname, originalname } = req.files[0];
      const fileExt = path.extname(originalname);

      const ref = `ipn=${ipNum}${fieldname}-${uid}${fileExt}`;
      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(`./uploads/${ref}`);

      return res.status(200).json({
        cdn: ref,
      });
    })
    .catch(() => res.status(400).json({ message: 'could not make image cdn!' }));
});

module.exports = router;
