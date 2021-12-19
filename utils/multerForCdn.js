const multer = require('multer');
const path = require('path');
const glob = require('glob');
const { v4: uuidv4 } = require('uuid');
const { unlinkSync } = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileExt = path.extname(file.originalname);

    let ipNum = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    if (ipNum) {
      ipNum = ipNum.replace(/[^0-9.]/g, '');
    }

    const deleteOldAssets = new Promise((resolve) => {
      // find old files
      glob(`**/ipn=${ipNum}${file.fieldname}-*`, null, async (er, files) => {
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

    deleteOldAssets
      .then(() => {
        const uid = uuidv4();
        cb(null, `ipn=${ipNum}${file.fieldname}-${uid}${fileExt}`);
      });
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('profile image only allowed jpeg/png'));
  }
}

const upload = multer({ storage, fileFilter });
module.exports = upload;
