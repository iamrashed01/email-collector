const multer = require('multer');
const path = require('path');

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
    cb(null, `${ipNum}${file.fieldname}${fileExt}`);
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
